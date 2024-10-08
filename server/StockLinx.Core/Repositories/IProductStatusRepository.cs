﻿using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IProductStatusRepository : IRepository<ProductStatus>
    {
        ProductStatusDto GetDto(ProductStatus entity);
        List<ProductStatusDto> GetDtos(List<ProductStatus> entities);
        Task<List<ProductStatusDto>> GetAllDtosAsync();
        Task CanDeleteAsync(Guid id);
        Task<List<ProductStatusDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
