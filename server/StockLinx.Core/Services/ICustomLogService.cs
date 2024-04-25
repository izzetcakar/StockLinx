using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ICustomLogService : IService<CustomLog>
    {
        Task CreateCustomLog(string action, string itemController, Guid itemId, string item, string targetController, Guid targetId, string target);
        Task CreateCustomLog(string action, string itemController, Guid itemId, string item);
        Task<IEnumerable<CustomLog>> GetAllDtosAsync();
    }
}
