﻿using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ICustomLogService : IService<CustomLog>
    {
        Task CreateCustomLog(string action, Guid itemId, Guid? targetId, string itemController, string? targetController);
        Task<IEnumerable<CustomLogDto>> GetAllDtosAsync();
    }
}