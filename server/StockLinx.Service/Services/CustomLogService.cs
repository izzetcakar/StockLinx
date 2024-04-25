using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class CustomLogService : Service<CustomLog>, ICustomLogService
    {
        private readonly ICustomLogRepository _customLogRepository;
        private readonly IServiceProvider _serviceProvider;
        public CustomLogService(IRepository<CustomLog> repository, IUnitOfWork unitOfWork,
            ICustomLogRepository customLogRepository, IServiceProvider serviceProvider) : base(repository, unitOfWork)
        {
            _customLogRepository = customLogRepository;
            _serviceProvider = serviceProvider;
        }

        public async Task CreateCustomLog(string action, string itemController, string item, string targetController, string target)
        {
            var userService = _serviceProvider.GetRequiredService<IUserService>();
            var user = await userService.GetCurrentUser();
            var customLog = new CustomLog
            {
                Id = Guid.NewGuid(),
                Date = DateTime.UtcNow,
                UserId = user.Id,
                Item = item,
                Target = target,
                ItemController = itemController,
                TargetController = targetController,
                Action = action,
            };
            await _customLogRepository.AddAsync(customLog);
        }

        public async Task CreateCustomLog(string action, string itemController, string item)
        {
            var userService = _serviceProvider.GetRequiredService<IUserService>();
            var user = await userService.GetCurrentUser();
            var customLog = new CustomLog
            {
                Id = Guid.NewGuid(),
                Date = DateTime.UtcNow,
                UserId = user.Id,
                Action = action,
                Item = item,
                ItemController = itemController,
                Target = null,
                TargetController = null,
            };
            await _customLogRepository.AddAsync(customLog);
        }

        public async Task<IEnumerable<CustomLog>> GetAllDtosAsync()
        {
            var customLogs = await _customLogRepository.GetAll().ToListAsync();
            return customLogs;
        }
    }
}
