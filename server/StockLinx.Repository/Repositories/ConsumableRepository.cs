using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ConsumableRepository : Repository<Consumable>, IConsumableRepository
    {
        private readonly IMapper _mapper;

        public ConsumableRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<ConsumableDto> GetDtoAsync(Consumable entity)
        {
            var employeeProducts = await dbContext
                .EmployeeProducts.Where(d => d.ConsumableId.HasValue && d.ConsumableId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            var availableQuantity = entity.Quantity - employeeProducts.Sum(d => d.Quantity);
            var dto = _mapper.Map<ConsumableDto>(entity);
            dto.AvailableQuantity = availableQuantity;
            return dto;
        }

        public async Task<List<ConsumableDto>> GetDtosAsync(List<Consumable> entities)
        {
            var dtos = new List<ConsumableDto>();

            foreach (Consumable entity in entities)
            {
                var dto = await GetDtoAsync(entity);
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<List<ConsumableDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.Consumables.AsNoTracking().ToListAsync();
            return await GetDtosAsync(entities);
        }

        public async Task<List<ConsumableDto>> GetAllDtosAsync(List<Guid> companyIds)
        {
            var entities = await dbContext
                .Consumables.Where(a => companyIds.Contains(a.CompanyId))
                .AsNoTracking()
                .ToListAsync();
            return await GetDtosAsync(entities);
        }

        public async Task CanDeleteAsync(Guid id)
        {
            bool employeeProducts = await dbContext.EmployeeProducts.AnyAsync(d =>
                d.ConsumableId.HasValue && d.ConsumableId == id
            );
            if (employeeProducts)
            {
                throw new Exception(
                    "Cannot delete consumable because it is used in user products."
                );
            }
        }

        public async Task<int> GetAvaliableQuantityAsync(Consumable entity)
        {
            List<EmployeeProduct> employeeProducts = await dbContext
                .EmployeeProducts.Where(d => d.ConsumableId.HasValue && d.ConsumableId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            int availableQuantity = entity.Quantity - employeeProducts.Sum(up => up.Quantity);
            return availableQuantity;
        }

        public async Task<List<ConsumableDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            var query = dbContext
                .Consumables.Where(c => ids.Contains(c.Id))
                .Select(c => new ConsumableDisplayDto
                {
                    Tag = c.Tag,
                    Name = c.Name,
                    Category = c.Category.Name,
                    Company = c.Company.Name,
                    Supplier = c.Supplier.Name,
                    Manufacturer = c.Manufacturer.Name,
                    ModelNo = c.ModelNo,
                    ItemNo = c.ItemNo,
                    OrderNo = c.OrderNo,
                    PurchaseCost = c.PurchaseCost,
                    PurchaseDate = c.PurchaseDate,
                    Quantity = c.Quantity,
                    AvailableQuantity = c.Quantity - c.EmployeeProducts.Sum(up => up.Quantity),
                    Notes = c.Notes,
                });
            return await query.ToListAsync();
        }
    }
}
