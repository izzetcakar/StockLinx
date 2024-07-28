using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
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

        public async Task CanDeleteAsync(Guid id)
        {
            var assets = await dbContext.Assets.AnyAsync(a => a.ProductStatusId == id);
            if (assets)
            {
                throw new Exception("Product Status is in use");
            }
        }

        public async Task<List<ProductStatusDisplayDto>> GetDisplayDtos(List<Guid> ids) {
            var query = dbContext
                .ProductStatuses.Where(d => ids.Contains(d.Id))
                .Select(d => new ProductStatusDisplayDto
                {
                    Name = d.Name,
                    Type = d.Type.ToString(),
        });
            return await query.ToListAsync();
        }
    }
}
