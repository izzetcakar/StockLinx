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
        private readonly IBranchRepository _branchRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AccessoryService(
            IRepository<Accessory> repository,
            IAccessoryRepository accessoryRepository,
            IBranchRepository branchRepository,
            IUserProductRepository userProductRepository,
            ICustomLogService customLogService,
            IUserService userService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _accessoryRepository = accessoryRepository;
            _userProductRepository = userProductRepository;
            _branchRepository = branchRepository;
            _customLogService = customLogService;
            _userService = userService;
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
            await _accessoryRepository.CheckTagExistAsync(dto.Tag);
            Branch branch = await _branchRepository.GetByIdAsync(dto.BranchId);
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
                "Branch",
                branch.Id,
                branch.Name
            );
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDtoAsync(newAccessory);
        }

        public async Task<List<AccessoryDto>> CreateRangeAccessoryAsync(
            List<AccessoryCreateDto> dtos
        )
        {
            await _accessoryRepository.CheckTagExistAsync(dtos.Select(dto => dto.Tag).ToList());
            Branch branch = await _branchRepository.GetByIdAsync(dtos[0].BranchId);
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
                    "Branch",
                    branch.Id,
                    branch.Name
                );
            }
            await _accessoryRepository.AddRangeAsync(newAccessories);
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDtosAsync(newAccessories);
        }

        public async Task<AccessoryDto> UpdateAccessoryAsync(AccessoryUpdateDto dto)
        {
            await _accessoryRepository.CheckExistAsync(dto.Id);
            Accessory accessoryInDb = await GetByIdAsync(dto.Id);
            Accessory accessory = _mapper.Map<Accessory>(dto);
            accessory.UpdatedDate = DateTime.UtcNow;

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
            int availableQuantity = await _accessoryRepository.GetAvaliableQuantityAsync(accessory);
            if (accessory.Quantity < availableQuantity)
            {
                throw new Exception(
                    "Quantity must be greater than or equal to the available quantity"
                );
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
            await _accessoryRepository.CheckExistAsync(id);
            Accessory accessory = await GetByIdAsync(id);
            bool canDelete = await _accessoryRepository.CanDeleteAsync(id);
            if (canDelete)
            {
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

        public async Task DeleteRangeAccessoryAsync(List<Guid> ids)
        {
            List<Accessory> accessories = new List<Accessory>();
            foreach (Guid id in ids)
            {
                await _accessoryRepository.CheckExistAsync(id);
                Accessory accessory = await GetByIdAsync(id);
                accessories.Add(accessory);
            }
            foreach (Accessory accessory in accessories)
            {
                bool canDelete = await _accessoryRepository.CanDeleteAsync(accessory.Id);
                if (canDelete)
                {
                    await _customLogService.CreateCustomLog(
                        "Delete",
                        "Accessory",
                        accessory.Id,
                        accessory.Name
                    );
                    _accessoryRepository.Remove(accessory);
                }
            }
            await _unitOfWork.CommitAsync();
        }

        public async Task<UserProduct> CheckInAsync(UserProductCheckInDto checkInDto)
        {
            await _accessoryRepository.CheckExistAsync(checkInDto.ProductId);
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
            return userProduct;
        }

        public async Task CheckOutAsync(UserProductCheckOutDto checkOutDto)
        {
            UserProduct userProduct = await _userProductRepository.GetByIdAsync(
                checkOutDto.UserProductId
            );
            Accessory accessory = await GetByIdAsync(checkOutDto.ProductId);
            switch (userProduct.Quantity - checkOutDto.Quantity)
            {
                case 0:
                    _userProductRepository.Remove(userProduct);
                    await _customLogService.CreateCustomLog(
                        "CheckOut",
                        "Accessory",
                        accessory.Id,
                        accessory.Name,
                        checkOutDto.Notes ?? "Checked out " + checkOutDto.Quantity + " units"
                    );
                    break;
                case > 0:
                    throw new Exception(
                        "Quantity must be less than or equal to the quantity in stock"
                    );
                case < 0:
                    UserProduct newUserProduct = userProduct;
                    newUserProduct.Quantity -= checkOutDto.Quantity;
                    _userProductRepository.Update(userProduct, newUserProduct);
                    await _customLogService.CreateCustomLog(
                        "CheckOut",
                        "Accessory",
                        accessory.Id,
                        accessory.Name,
                        checkOutDto.Notes ?? "Checked out " + checkOutDto.Quantity + " units"
                    );
                    break;
            }

            await _unitOfWork.CommitAsync();
        }
    }
}
