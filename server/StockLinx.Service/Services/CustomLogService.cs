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

        public CustomLogService(
            IRepository<CustomLog> repository,
            IUnitOfWork unitOfWork,
            ICustomLogRepository customLogRepository,
            IServiceProvider serviceProvider
        )
            : base(repository, unitOfWork)
        {
            _customLogRepository = customLogRepository;
            _serviceProvider = serviceProvider;
        }

        public async Task CreateCustomLog(
            string action,
            string itemController,
            Guid itemId,
            string item,
            string targetController,
            Guid targetId,
            string target
        )
        {
            var userService = _serviceProvider.GetRequiredService<IUserService>();
            var user = await userService.GetCurrentUser();
            var customLog = new CustomLog
            {
                Id = Guid.NewGuid(),
                Date = DateTime.UtcNow,
                Action = action,
                UserId = user.Id,
                ItemController = itemController,
                ItemId = itemId,
                Item = item,
                TargetController = targetController,
                TargetId = targetId,
                Target = target,
            };
            await _customLogRepository.AddAsync(customLog);
        }

        public async Task CreateCustomLog(
            string action,
            string itemController,
            Guid itemId,
            string item
        )
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
                ItemId = itemId,
                Target = null,
                TargetController = null,
                TargetId = null,
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
