﻿using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
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
        private readonly IEmployeeProductRepository _employeeProductRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IPermissionService _permissionService;
        private readonly IFilterService<Accessory> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AccessoryService(
            IRepository<Accessory> repository,
            IAccessoryRepository accessoryRepository,
            IEmployeeRepository employeeRepository,
            ICompanyRepository companyRepository,
            IEmployeeProductRepository employeeProductRepository,
            ICustomLogService customLogService,
            IPermissionService permissionService,
            IFilterService<Accessory> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _accessoryRepository = accessoryRepository;
            _employeeRepository = employeeRepository;
            _employeeProductRepository = employeeProductRepository;
            _companyRepository = companyRepository;
            _customLogService = customLogService;
            _permissionService = permissionService;
            _filterService = filterService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<AccessoryDto> GetDtoAsync(Guid id)
        {
            Accessory accessory = await GetByIdAsync(id);
            await _permissionService.VerifyCompanyAccessAsync(accessory.CompanyId);
            return await _accessoryRepository.GetDtoAsync(accessory);
        }

        public async Task<List<AccessoryDto>> GetAllDtosAsync()
        {
            List<Guid> companyIds = await _permissionService.GetCompanyIdsAsync();
            return await _accessoryRepository.GetAllDtosAsync(companyIds);
        }

        public async Task<AccessoryDto> CreateAccessoryAsync(AccessoryCreateDto dto)
        {
            await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
            await CheckTagExistAsync(dto.CompanyId, dto.Tag);
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
            await CreateCheckLogAsync(
                "Create",
                newAccessory,
                await _companyRepository.GetByIdAsync(newAccessory.CompanyId)
            );
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDtoAsync(newAccessory);
        }

        public async Task<List<AccessoryDto>> CreateRangeAccessoryAsync(
            List<AccessoryCreateDto> dtos
        )
        {
            await CheckTagExistAsync(dtos[0].CompanyId, dtos.Select(dto => dto.Tag).ToList());
            List<Accessory> newAccessories = new List<Accessory>();
            foreach (AccessoryCreateDto dto in dtos)
            {
                await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
                Accessory newAccessory = _mapper.Map<Accessory>(dto);
                newAccessory.Quantity = 1;
                newAccessories.Add(newAccessory);
                await CreateCheckLogAsync(
                    "Create",
                    newAccessory,
                    await _companyRepository.GetByIdAsync(newAccessory.CompanyId)
                );
            }
            await _accessoryRepository.AddRangeAsync(newAccessories);
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDtosAsync(newAccessories);
        }

        public async Task<AccessoryDto> UpdateAccessoryAsync(AccessoryUpdateDto dto)
        {
            await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
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
            await CreateCheckLogAsync("Update", accessory);
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDtoAsync(accessory);
        }

        public async Task DeleteAccessoryAsync(Guid id)
        {
            Accessory accessory = await GetByIdAsync(id);
            await _permissionService.VerifyCompanyAccessAsync(accessory.CompanyId);
            await _accessoryRepository.CanDeleteAsync(id);
            await _customLogService.CreateCustomLog(
                "Delete",
                "Accessory",
                accessory.Id,
                accessory.Name
            );
            _accessoryRepository.Remove(accessory);
            await CreateCheckLogAsync("Delete", accessory);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeAccessoryAsync(List<Guid> ids)
        {
            List<Accessory> accessories = new List<Accessory>();
            foreach (Guid id in ids)
            {
                Accessory accessory = await GetByIdAsync(id);
                await _permissionService.VerifyCompanyAccessAsync(accessory.CompanyId);
                accessories.Add(accessory);
            }
            foreach (Accessory accessory in accessories)
            {
                await _accessoryRepository.CanDeleteAsync(accessory.Id);
                await CreateCheckLogAsync("Delete", accessory);
                _accessoryRepository.Remove(accessory);
            }
            await _unitOfWork.CommitAsync();
        }

        public async Task<EmployeeProductDto> CheckInAsync(EmployeeProductCheckInDto checkInDto)
        {
            Employee employee = await _employeeRepository.GetByIdAsync(checkInDto.EmployeeId);
            Accessory accessory = await GetByIdAsync(checkInDto.ProductId);
            await _permissionService.VerifyCompanyAccessAsync(accessory.CompanyId);
            int availableQuantity = await _accessoryRepository.GetAvaliableQuantityAsync(accessory);
            if (availableQuantity - checkInDto.Quantity < 0)
            {
                throw new Exception("Accessory stock is not enough");
            }
            EmployeeProduct employeeProduct = new EmployeeProduct
            {
                Id = Guid.NewGuid(),
                AccessoryId = accessory.Id,
                EmployeeId = checkInDto.EmployeeId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Quantity = checkInDto.Quantity,
                Notes = checkInDto.Notes,
            };
            await _employeeProductRepository.AddAsync(employeeProduct);
            await CreateCheckLogAsync("CheckIn", accessory, employee, checkInDto.Quantity);
            await _unitOfWork.CommitAsync();
            return await _employeeProductRepository.GetDtoAsync(employeeProduct);
        }

        public async Task<List<EmployeeProductDto>> CheckOutAsync(
            EmployeeProductCheckOutDto checkOutDto
        )
        {
            List<EmployeeProduct> employeeProducts = new List<EmployeeProduct>();
            EmployeeProduct employeeProduct = await _employeeProductRepository.GetByIdAsync(
                checkOutDto.EmployeeProductId
            );
            Accessory accessory = await GetByIdAsync((Guid)employeeProduct.AccessoryId);
            await _permissionService.VerifyCompanyAccessAsync(accessory.CompanyId);
            bool isEmployeeChanged =
                checkOutDto.EmployeeId != null
                && checkOutDto.EmployeeId != employeeProduct.EmployeeId;
            switch (employeeProduct.Quantity - checkOutDto.Quantity)
            {
                case 0:
                    await CreateCheckLogAsync("CheckOut", accessory, checkOutDto.Quantity);
                    if (isEmployeeChanged)
                    {
                        employeeProduct.EmployeeId = (Guid)checkOutDto.EmployeeId;
                        _employeeProductRepository.Update(employeeProduct, employeeProduct);
                        await CreateCheckLogAsync(
                            "CheckIn",
                            accessory,
                            await _employeeRepository.GetByIdAsync((Guid)checkOutDto.EmployeeId),
                            checkOutDto.Quantity
                        );
                        employeeProducts.Add(employeeProduct);
                    }
                    else
                    {
                        await CreateCheckLogAsync("CheckOut", accessory, checkOutDto.Quantity);
                        _employeeProductRepository.Remove(employeeProduct);
                    }
                    await _unitOfWork.CommitAsync();
                    ;
                    return await _employeeProductRepository.GetDtosAsync(employeeProducts);
                case < 0:
                    throw new Exception(
                        "Quantity must be less than or equal to the quantity in stock"
                    );
                case > 0:
                    employeeProduct.Quantity -= checkOutDto.Quantity;
                    _employeeProductRepository.Update(employeeProduct, employeeProduct);
                    await CreateCheckLogAsync("CheckOut", accessory, checkOutDto.Quantity);
                    employeeProducts.Add(employeeProduct);
                    if (isEmployeeChanged)
                    {
                        EmployeeProduct newEmployeeProduct = new EmployeeProduct
                        {
                            Id = Guid.NewGuid(),
                            AccessoryId = accessory.Id,
                            EmployeeId = (Guid)checkOutDto.EmployeeId,
                            AssignDate = DateTime.UtcNow,
                            CreatedDate = DateTime.UtcNow,
                            Quantity = checkOutDto.Quantity,
                            Notes = checkOutDto.Notes,
                        };
                        await CreateCheckLogAsync(
                            "CheckIn",
                            accessory,
                            await _employeeRepository.GetByIdAsync((Guid)checkOutDto.EmployeeId),
                            checkOutDto.Quantity
                        );
                        await _employeeProductRepository.AddAsync(newEmployeeProduct);
                        employeeProducts.Add(newEmployeeProduct);
                    }
                    await _unitOfWork.CommitAsync();
                    return await _employeeProductRepository.GetDtosAsync(employeeProducts);
            }
        }

        public async Task CheckTagExistAsync(Guid companyId, string tag)
        {
            tag = TagUtils.Check(tag);
            bool isExist = await AnyAsync(ac => ac.Tag == tag && ac.CompanyId == companyId);
            if (isExist)
            {
                throw new Exception($"Tag {tag} already exist.");
            }
        }

        public async Task CheckTagExistAsync(Guid companyId, List<string> tags)
        {
            tags = TagUtils.Check(tags);
            var existingTags = await Where(ac =>
                tags.Contains(ac.Tag) && ac.CompanyId == companyId
            );
            if (existingTags.Count() > 0)
            {
                var existingTagNames = existingTags.Select(x => x.Tag).ToList();
                throw new Exception($"Tags {string.Join("\n", existingTagNames)} already exist.");
            }
        }

        public async Task<List<AccessoryDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            var list = await _accessoryRepository.GetDtosAsync(result.ToList());
            var companyIds = await _permissionService.GetCompanyIdsAsync();
            return list.Where(x => companyIds.Contains(x.CompanyId)).ToList();
        }

        public async Task CreateCheckLogAsync(
            string action,
            Accessory accessory,
            Employee employee,
            int quantity
        )
        {
            await _customLogService.CreateCustomLog(
                action,
                "Accessory",
                accessory.Id,
                accessory.Name,
                "Employee",
                employee.Id,
                employee.FirstName + employee.LastName,
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

        public async Task CreateCheckLogAsync(string action, Accessory accessory)
        {
            await _customLogService.CreateCustomLog(
                action,
                "Accessory",
                accessory.Id,
                accessory.Name
            );
        }

        public async Task CreateCheckLogAsync(string action, Accessory accessory, Company company)
        {
            await _customLogService.CreateCustomLog(
                action,
                "Accessory",
                accessory.Id,
                accessory.Name,
                "Company",
                company.Id,
                company.Name
            );
        }

        public async Task<List<AccessoryDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            return await _accessoryRepository.GetDisplayDtos(ids);
        }
    }
}
