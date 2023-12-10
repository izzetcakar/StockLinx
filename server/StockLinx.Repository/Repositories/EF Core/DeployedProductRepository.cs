using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class DeployedProductRepository : Repository<DeployedProduct>, IDeployedProductRepository
    {
        private readonly IMapper _mapper;
        public DeployedProductRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public DeployedProductDto GetDto(DeployedProduct entity)
        {
            return _mapper.Map<DeployedProductDto>(entity);
        }
        public List<DeployedProductDto> GetDtos(List<DeployedProduct> entities)
        {
            var dtos = new List<DeployedProductDto>();
            dtos = _mapper.Map<List<DeployedProductDto>>(entities);
            return dtos;
        }
        public async Task<List<DeployedProductDto>> GetAllDtos()
        {
            var entities = await dbContext.DeployedProducts.Where(d => d.DeletedDate == null).AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }

}
