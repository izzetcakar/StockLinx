﻿using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IAccessoryRepository : IRepository<Accessory>
    {
        Task<AccessoryDto> GetDtoAsync(Accessory entity);
        Task<List<AccessoryDto>> GetDtosAsync(List<Accessory> entities);
        Task<List<AccessoryDto>> GetAllDtosAsync();
        Task<List<AccessoryDto>> GetAllDtosAsync(List<Guid> companyIds);
        Task CanDeleteAsync(Guid id);
        Task<int> GetAvaliableQuantityAsync(Accessory entity);
        Task<List<AccessoryDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
