using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ICustomLogService : IService<CustomLog>
    {
        Task CreateCustomLog(string action, string itemController, string item, string targetController, string target);
        Task CreateCustomLog(string action, string itemController, string item);
        Task<IEnumerable<CustomLog>> GetAllDtosAsync();
    }
}
