using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ProductStatusRepository : Repository<ProductStatus>, IProductStatusRepository
    {
        private readonly IMapper _mapper;

        public ProductStatusRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public ProductStatusDto GetDto(ProductStatus entity)
        {
            return _mapper.Map<ProductStatusDto>(entity);
        }

        public List<ProductStatusDto> GetDtos(List<ProductStatus> entities)
        {
            var dtos = new List<ProductStatusDto>();
            dtos = _mapper.Map<List<ProductStatusDto>>(entities);
            return dtos;
        }

        public async Task<List<ProductStatusDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.ProductStatuses.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }

        public async Task<bool> CanDeleteAsync(Guid id)
        {
            var entity = dbContext.ProductStatuses.Find(id);
            if (entity == null)
            {
                throw new Exception("Product Status not found");
            }
            var assets = await dbContext.Assets.AnyAsync(a => a.ProductStatusId == id);
            var accessories = await dbContext.Accessories.AnyAsync(a => a.ProductStatusId == id);
            var components = await dbContext.Components.AnyAsync(c => c.ProductStatusId == id);
            var consumables = await dbContext.Consumables.AnyAsync(c => c.ProductStatusId == id);
            var licenses = await dbContext.Licenses.AnyAsync(l => l.ProductStatusId == id);
            var deployedProducts = await dbContext.DeployedProducts.AnyAsync(dp => dp.ProductStatusId == id);
            if (assets || accessories || components || consumables || licenses)
            {
                throw new Exception("Product Status is in use");
            }
            return true;
        }
    }
}
