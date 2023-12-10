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
        public ProductStatusRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
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
        public async Task<List<ProductStatusDto>> GetAllDtos()
        {
            var entities = await dbContext.ProductStatuses.Where(p => p.DeletedDate == null).AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
