using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StockLinx.Core.DTOs.Generic;
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

        public async Task CreateCustomLog(string action, Guid itemId, Guid? targetId, string itemController, string? targetController)
        {
            var userService = _serviceProvider.GetRequiredService<IUserService>();
            var user = await userService.GetCurrentUser();
            var customLog = new CustomLog
            {
                Id = Guid.NewGuid(),
                Date = DateTime.UtcNow,
                UserId = user.Id,
                ItemId = itemId,
                TargetId = targetId,
                ItemController = itemController,
                TargetController = targetController,
                Action = action,
            };
            await _customLogRepository.AddAsync(customLog);
        }

        public async Task<IEnumerable<CustomLogDto>> GetAllDtosAsync()
        {
            var allLogs = await _customLogRepository
                .GetAll()
                .ToListAsync();

            var logDtos = allLogs.Select(async x => new CustomLogDto
            {
                Id = x.Id,
                UserId = x.UserId,
                Date = x.Date,
                Action = x.Action,
                ItemRoute = $"{x.ItemController.ToLower()}/{x.ItemId}",
                TargetRoute = x.TargetController != null ? $"{x.TargetController.ToLower()}/{x.TargetId}" : null,
                ItemController = x.ItemController,
                TargetController = x.TargetController,
                ItemName = await _customLogRepository.GetObjByIdAsync(x.ItemController, x.ItemId),
                TargetName = (x.TargetController != null && x.TargetId != null)
                    ? await _customLogRepository.GetObjByIdAsync(x.TargetController, (Guid)x.TargetId)
                    : null,
            }).Select(x => x.Result).ToList();

            return logDtos;
        }
    }
}
