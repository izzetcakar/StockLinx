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

        public ProductStatusDto GetProductStatusDto(ProductStatus productStatus)
        {
            var productStatusDto = _mapper.Map<ProductStatusDto>(productStatus);
            return productStatusDto;
        }
        public List<ProductStatusDto> GetProductStatusDtos(List<ProductStatus> productStatuses)
        {
            var productStatusDtos = new List<ProductStatusDto>();
            productStatusDtos = _mapper.Map<List<ProductStatusDto>>(productStatuses);
            return productStatusDtos;
        }
        public async Task<List<ProductStatusDto>> GetAllProductStatusDtos()
        {
            var productStatuses = await dbContext.ProductStatuses.AsNoTracking().ToListAsync();
            return GetProductStatusDtos(productStatuses);
        }
    }
}
