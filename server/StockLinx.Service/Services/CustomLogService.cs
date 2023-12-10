using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class CustomLogService : Service<CustomLog>, ICustomLogService
    {
        private readonly ICustomLogRepository _customLogRepository;
        private readonly IUserService _userService;
        public CustomLogService(IRepository<CustomLog> repository, IUnitOfWork unitOfWork,
            ICustomLogRepository customLogRepository, IUserService userService) : base(repository, unitOfWork)
        {
            _customLogRepository = customLogRepository;
            _userService = userService;
        }

        public async Task CreateCustomLog(string action, Guid itemId, Guid? targetId, string itemController, string? targetController)
        {
            var user = await _userService.GetCurrentUser();
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

        public object GetObjById(string entityName, Guid id)
        {
            var obj = _customLogRepository.GetObjById(entityName, id);
            return obj;
        }
    }
}
