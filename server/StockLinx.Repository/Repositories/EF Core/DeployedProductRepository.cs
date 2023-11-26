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

        public DeployedProductDto GetDeployedProductDto(DeployedProduct deployedProduct)
        {
            var deployedProductDto = _mapper.Map<DeployedProductDto>(deployedProduct);
            return deployedProductDto;
        }
        public List<DeployedProductDto> GetDeployedProductDtos(List<DeployedProduct> deployedProducts)
        {
            var deployedProductDtos = new List<DeployedProductDto>();
            deployedProductDtos = _mapper.Map<List<DeployedProductDto>>(deployedProducts);
            return deployedProductDtos;
        }
        public async Task<List<DeployedProductDto>> GetAllDeployedProductDtos()
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            return GetDeployedProductDtos(deployedProducts);
        }
    }

}
