﻿using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class AccessoryService : Service<Accessory>, IAccessoryService
    {
        private readonly IAccessoryRepository _accessoryRepository;
        private readonly IUserProductRepository _userProductRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IUserService _userService;
        private readonly IFilterService<Accessory> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AccessoryService(
            IRepository<Accessory> repository,
            IAccessoryRepository accessoryRepository,
            ICompanyRepository companyRepository,
            IUserProductRepository userProductRepository,
            ICustomLogService customLogService,
            IUserService userService,
            IFilterService<Accessory> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _accessoryRepository = accessoryRepository;
            _userProductRepository = userProductRepository;
            _companyRepository = companyRepository;
            _customLogService = customLogService;
            _userService = userService;
            _filterService = filterService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<AccessoryDto> GetDto(Guid id)
        {
            Accessory accessory = await GetByIdAsync(id);
            return await _accessoryRepository.GetDtoAsync(accessory);
        }

        public async Task<List<AccessoryDto>> GetAllDtos()
        {
            return await _accessoryRepository.GetAllDtosAsync();
        }

        public async Task<AccessoryDto> CreateAccessoryAsync(AccessoryCreateDto dto)
        {
            await CheckTagExistAsync(dto.Tag);
            Company company = await _companyRepository.GetByIdAsync(dto.CompanyId);
            Accessory newAccessory = _mapper.Map<Accessory>(dto);

            if (newAccessory.ImagePath != null)
            {
                if (newAccessory.ImagePath.Contains("base64,"))
                {
                    ImageUtils.UploadBase64AsJpg(
                        newAccessory.ImagePath,
                        $"{newAccessory.Id}",
                        "Accessories"
                    );
                    newAccessory.ImagePath = $"Accessories/{newAccessory.Id}.jpg";
                }
            }

            await _accessoryRepository.AddAsync(newAccessory);
            await _customLogService.CreateCustomLog(
                "Create",
                "Accessory",
                newAccessory.Id,
                newAccessory.Name,
                "Company",
                company.Id,
                company.Name
            );
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDtoAsync(newAccessory);
        }

        public async Task<List<AccessoryDto>> CreateRangeAccessoryAsync(
            List<AccessoryCreateDto> dtos
        )
        {
            await CheckTagExistAsync(dtos.Select(dto => dto.Tag).ToList());
            Company company = await _companyRepository.GetByIdAsync(dtos[0].CompanyId);
            List<Accessory> newAccessories = new List<Accessory>();
            foreach (AccessoryCreateDto dto in dtos)
            {
                Accessory newAccessory = _mapper.Map<Accessory>(dto);
                newAccessory.Quantity = 1;
                newAccessories.Add(newAccessory);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "Accessory",
                    newAccessory.Id,
                    newAccessory.Name,
                    "Company",
                    company.Id,
                    company.Name
                );
            }
            await _accessoryRepository.AddRangeAsync(newAccessories);
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDtosAsync(newAccessories);
        }

        public async Task<AccessoryDto> UpdateAccessoryAsync(AccessoryUpdateDto dto)
        {
            Accessory accessoryInDb = await GetByIdAsync(dto.Id);
            Accessory accessory = _mapper.Map<Accessory>(dto);
            accessory.UpdatedDate = DateTime.UtcNow;

            int availableQuantity = await _accessoryRepository.GetAvaliableQuantityAsync(accessory);
            if (accessory.Quantity < availableQuantity)
            {
                throw new Exception(
                    "Quantity must be greater than or equal to the available quantity"
                );
            }

            if (accessory.ImagePath != null)
            {
                if (accessory.ImagePath.Contains("base64,"))
                {
                    ImageUtils.UploadBase64AsJpg(
                        accessory.ImagePath,
                        $"{accessory.Id}",
                        "Accessories"
                    );
                    accessory.ImagePath = $"Accessories/{accessory.Id}.jpg";
                }
            }
            _accessoryRepository.Update(accessoryInDb, accessory);
            await _customLogService.CreateCustomLog(
                "Update",
                "Accessory",
                accessory.Id,
                accessory.Name
            );
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDtoAsync(accessory);
        }

        public async Task DeleteAccessoryAsync(Guid id)
        {
            await _accessoryRepository.CanDeleteAsync(id);
            Accessory accessory = await GetByIdAsync(id);
            await _customLogService.CreateCustomLog(
                "Delete",
                "Accessory",
                accessory.Id,
                accessory.Name
            );
            _accessoryRepository.Remove(accessory);

            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeAccessoryAsync(List<Guid> ids)
        {
            List<Accessory> accessories = new List<Accessory>();
            foreach (Guid id in ids)
            {
                Accessory accessory = await GetByIdAsync(id);
                accessories.Add(accessory);
            }
            foreach (Accessory accessory in accessories)
            {
                await _accessoryRepository.CanDeleteAsync(accessory.Id);
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "Accessory",
                    accessory.Id,
                    accessory.Name
                );
                _accessoryRepository.Remove(accessory);
            }
            await _unitOfWork.CommitAsync();
        }

        public async Task<UserProductDto> CheckInAsync(UserProductCheckInDto checkInDto)
        {
            User user = await _userService.GetByIdAsync(checkInDto.UserId);
            Accessory accessory = await GetByIdAsync(checkInDto.ProductId);
            int availableQuantity = await _accessoryRepository.GetAvaliableQuantityAsync(accessory);
            if (availableQuantity - checkInDto.Quantity < 0)
            {
                throw new Exception("Accessory stock is not enough");
            }
            UserProduct userProduct = new UserProduct
            {
                Id = Guid.NewGuid(),
                AccessoryId = accessory.Id,
                UserId = checkInDto.UserId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Quantity = checkInDto.Quantity,
                Notes = checkInDto.Notes,
            };
            await _userProductRepository.AddAsync(userProduct);
            await _customLogService.CreateCustomLog(
                "CheckIn",
                "Accessory",
                accessory.Id,
                accessory.Name,
                "User",
                user.Id,
                user.FirstName + user.LastName,
                "Checked in " + checkInDto.Quantity + " units"
            );
            await _unitOfWork.CommitAsync();
            return await _userProductRepository.GetDtoAsync(userProduct);
        }

        public async Task<List<UserProductDto>> CheckOutAsync(UserProductCheckOutDto checkOutDto)
        {
            List<UserProduct> userProducts = new List<UserProduct>();
            UserProduct userProduct = await _userProductRepository.GetByIdAsync(
                checkOutDto.UserProductId
            );
            Accessory accessory = await GetByIdAsync((Guid)userProduct.AccessoryId);
            bool isUserChanged = checkOutDto.UserId != null && checkOutDto.UserId != userProduct.UserId;
            switch (userProduct.Quantity - checkOutDto.Quantity)
            {
                case 0:
                    await CreateCheckLogAsync("CheckOut", accessory, checkOutDto.Quantity);
                    if (isUserChanged)
                    {
                        userProduct.UserId = (Guid)checkOutDto.UserId;
                        _userProductRepository.Update(userProduct, userProduct);
                        await CreateCheckLogAsync(
                            "CheckOut",
                            accessory,
                            await _userService.GetByIdAsync((Guid)checkOutDto.UserId),
                            checkOutDto.Quantity
                        );
                        userProducts.Add(userProduct);
                    }
                    else
                    {
                        await CreateCheckLogAsync("CheckOut", accessory, checkOutDto.Quantity);
                        _userProductRepository.Remove(userProduct);
                    }
                    await _unitOfWork.CommitAsync();
                    ;
                    return await _userProductRepository.GetDtosAsync(userProducts);
                case > 0:
                    throw new Exception(
                        "Quantity must be less than or equal to the quantity in stock"
                    );
                case < 0:
                    userProduct.Quantity -= checkOutDto.Quantity;
                    _userProductRepository.Update(userProduct, userProduct);
                    await CreateCheckLogAsync("CheckOut", accessory, checkOutDto.Quantity);
                    userProducts.Add(userProduct);
                    if (isUserChanged)
                    {
                        UserProduct newUserProduct = new UserProduct
                        {
                            Id = Guid.NewGuid(),
                            AccessoryId = accessory.Id,
                            UserId = (Guid)checkOutDto.UserId,
                            AssignDate = DateTime.UtcNow,
                            CreatedDate = DateTime.UtcNow,
                            Quantity = checkOutDto.Quantity,
                            Notes = checkOutDto.Notes,
                        };
                        await CreateCheckLogAsync(
                            "CheckOut",
                            accessory,
                            await _userService.GetByIdAsync((Guid)checkOutDto.UserId),
                            checkOutDto.Quantity
                        );
                        await _userProductRepository.AddAsync(newUserProduct);
                        userProducts.Add(newUserProduct);
                    }
                    await _unitOfWork.CommitAsync();
                    return await _userProductRepository.GetDtosAsync(userProducts);
            }
        }

        public async Task CheckTagExistAsync(string tag)
        {
            tag = TagUtils.Check(tag);
            bool isExist = await AnyAsync(d => d.Tag == tag);
            if (isExist)
            {
                throw new Exception($"Tag {tag} already exist.");
            }
        }

        public async Task CheckTagExistAsync(List<string> tags)
        {
            tags = TagUtils.Check(tags);
            var existingTags = await Where(d => tags.Contains(d.Tag));
            if (existingTags.Count() > 0)
            {
                var existingTagNames = existingTags.Select(x => x.Tag).ToList();
                throw new Exception($"Tags {string.Join("\n", existingTagNames)} already exist.");
            }
        }

        public async Task<List<AccessoryDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return await _accessoryRepository.GetDtosAsync(result.ToList());
        }

        public async Task CreateCheckLogAsync(
            string action,
            Accessory accessory,
            User user,
            int quantity
        )
        {
            await _customLogService.CreateCustomLog(
                action,
                "Accessory",
                accessory.Id,
                accessory.Name,
                "User",
                user.Id,
                user.FirstName + user.LastName,
                "Checked " + quantity + " units"
            );
        }

        public async Task CreateCheckLogAsync(string action, Accessory accessory, int quantity)
        {
            await _customLogService.CreateCustomLog(
                action,
                "Accessory",
                accessory.Id,
                accessory.Name,
                "Checked " + quantity + " units"
            );
        }
    }
}
