using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class EmployeeProductRepository : Repository<EmployeeProduct>, IEmployeeProductRepository
    {
        private readonly IMapper _mapper;
        private readonly IAccessoryRepository _accessoryRepository;
        private readonly IAssetRepository _assetRepository;
        private readonly IConsumableRepository _consumableRepository;
        private readonly ILicenseRepository _licenseRepository;

        public EmployeeProductRepository(
            AppDbContext dbContext,
            IMapper mapper,
            IAccessoryRepository accessoryRepository,
            IAssetRepository assetRepository,
            IConsumableRepository consumableRepository,
            ILicenseRepository licenseRepository
        )
            : base(dbContext)
        {
            _mapper = mapper;
            _accessoryRepository = accessoryRepository;
            _assetRepository = assetRepository;
            _consumableRepository = consumableRepository;
            _licenseRepository = licenseRepository;
        }

        public async Task<EmployeeProductDto> GetDtoAsync(EmployeeProduct entity)
        {
            string productType = string.Empty;
            string productTag = string.Empty;

            if (entity.AccessoryId != null)
            {
                var tag = await dbContext.Accessories
                    .Where(a => a.Id == entity.AccessoryId)
                    .Select(a => a.Tag)
                    .FirstOrDefaultAsync();
                productType = "Accessory";
                productTag = tag;
            }
            else if (entity.AssetId != null)
            {
                var tag = await dbContext.Assets
                    .Where(a => a.Id == entity.AssetId)
                    .Select(a => a.Tag)
                    .FirstOrDefaultAsync();
                productType = "Asset";
                productTag = tag;
            }
            else if (entity.ConsumableId != null)
            {
                var tag = await dbContext.Consumables
                    .Where(a => a.Id == entity.ConsumableId)
                    .Select(a => a.Tag)
                    .FirstOrDefaultAsync();
                productType = "Consumable";
                productTag = tag;
            }
            else if (entity.LicenseId != null)
            {
                var tag = await dbContext.Licenses
                    .Where(a => a.Id == entity.LicenseId)
                    .Select(a => a.Tag)
                    .FirstOrDefaultAsync();
                productType = "License";
                productTag = tag;
            }
            return new EmployeeProductDto()
            {
                Id = entity.Id,
                EmployeeId = entity.EmployeeId,
                AccessoryId = entity.AccessoryId,
                AssetId = entity.AssetId,
                ConsumableId = entity.ConsumableId,
                LicenseId = entity.LicenseId,
                CreatedDate = entity.CreatedDate,
                UpdatedDate = entity.UpdatedDate,
                AssignDate = entity.AssignDate,
                ProductType = productType,
                ProductTag = productTag,
                Notes = entity.Notes,
                Quantity = entity.Quantity,
            };
        }

        public async Task<List<EmployeeProductDto>> GetDtosAsync(List<EmployeeProduct> entities)
        {
            List<EmployeeProductDto> dtos = new List<EmployeeProductDto>();
            foreach (var entity in entities)
            {
                var dto = await GetDtoAsync(entity);
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<List<EmployeeProductDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.EmployeeProducts.ToListAsync();
            return await GetDtosAsync(entities);
        }

        public async Task<string> GetProductTag(EmployeeProduct employeeProduct)
        {
            if (employeeProduct.AccessoryId != null)
            {
                return await _accessoryRepository.GetByIdAsync((Guid)employeeProduct.AccessoryId)
                    .ContinueWith(a => a.Result.Tag);
            }
            else if (employeeProduct.AssetId != null)
            {
                return await _assetRepository.GetByIdAsync((Guid)employeeProduct.AssetId)
                    .ContinueWith(a => a.Result.Tag);
            }
            else if (employeeProduct.ConsumableId != null)
            {
                return await _consumableRepository.GetByIdAsync((Guid)employeeProduct.ConsumableId)
                    .ContinueWith(a => a.Result.Tag);
            }
            else if (employeeProduct.LicenseId != null)
            {
                return await _licenseRepository.GetByIdAsync((Guid)employeeProduct.LicenseId)
                    .ContinueWith(a => a.Result.Tag);
            }
            return string.Empty;
        }

        public async Task<string> GetroductDescription(EmployeeProduct employeeProduct)
        {
            if (employeeProduct.AccessoryId != null)
            {
                var res = await _accessoryRepository.GetByIdAsync((Guid)employeeProduct.AccessoryId);
                return res.Name + "-" + res.ModelNo;
            }
            else if (employeeProduct.AssetId != null)
            {
                var res = await _assetRepository.GetByIdAsync((Guid)employeeProduct.AssetId);
                return res.Name + "-" + res.SerialNo;
            }
            else if (employeeProduct.ConsumableId != null)
            {
                var res = await _consumableRepository.GetByIdAsync((Guid)employeeProduct.ConsumableId);
                return res.Name + "-" + res.ModelNo + "-" + res.ItemNo;
            }
            else if (employeeProduct.LicenseId != null)
            {
                var res = await _licenseRepository.GetByIdAsync((Guid)employeeProduct.LicenseId);
                return res.Name + "-" + res.LicenseKey + "-" + res.ExpirationDate?.ToString("MM/dd/yyyy");
            }
            return string.Empty;
        }

        public async Task<string> GetEmployeeName(EmployeeProduct employeeProduct)
        {
            return await dbContext.Employees
                .Where(a => a.Id == employeeProduct.EmployeeId)
                .Select(a => a.FirstName + " " + a.LastName)
                .FirstOrDefaultAsync();
        }

        public async Task<List<EmployeeProductDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            var employeeProducts = await dbContext.EmployeeProducts
                .Where(a => ids.Contains(a.Id))
                .ToListAsync();

            var displayDtos = new List<EmployeeProductDisplayDto>();

            foreach (var employeeProduct in employeeProducts)
            {
                var employeeName = await GetEmployeeName(employeeProduct);
                var productTag = await GetProductTag(employeeProduct);
                var dto = new EmployeeProductDisplayDto
                {
                    Employee = employeeName,
                    Product = productTag,
                    Quantity = employeeProduct.Quantity,
                    Seat = $"Seat {displayDtos.Count + 1}",
                    AssignDate = employeeProduct.AssignDate,
                    Notes = employeeProduct.Notes,
                };
                displayDtos.Add(dto);
            }

            return displayDtos;
        }

        public Task<int> GetProductCount(EmployeeProduct employeeProduct)
        {
            throw new NotImplementedException();
        }

        public Task<int> GetProductCounts(List<EmployeeProduct> employeeProducts)
        {
            throw new NotImplementedException();
        }
    }
}
