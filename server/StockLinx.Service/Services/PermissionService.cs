using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class PermissionService : Service<Permission>, IPermissionService
    {
        private readonly IPermissionRepository _permissionRepository;
        private readonly IUserService _userService;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public PermissionService(IRepository<Permission> repository, IUnitOfWork unitOfWork, IMapper mapper,
            IPermissionRepository permissionRepository, ICustomLogService customLogService, IUserService userService) : base(repository, unitOfWork)
        {
            _permissionRepository = permissionRepository;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userService = userService;
        }

        public async Task<PermissionDto> GetDto(Guid id)
        {
            var user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new ArgumentNullException("User is not admin");
            }
            var permission = await GetByIdAsync(id);
            return _permissionRepository.GetDto(permission);
        }

        public async Task<List<PermissionDto>> GetAllDtos()
        {
            var user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                return new List<PermissionDto>();
            }
            return await _permissionRepository.GetAllDtos();
        }

        public async Task<PermissionDto> CreatePermissionAsync(PermissionCreateDto createDto)
        {
            var user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new ArgumentNullException("User is not admin");
            }
            var newPermission = _mapper.Map<Permission>(createDto);
            newPermission.Id = Guid.NewGuid();
            newPermission.CreatedDate = DateTime.UtcNow;
            await _permissionRepository.AddAsync(newPermission);
            await _customLogService.CreateCustomLog("Permission Given", newPermission.UserId, newPermission.BranchId, "User", "Branch");
            await _unitOfWork.CommitAsync();
            return _permissionRepository.GetDto(newPermission);
        }

        public async Task<List<PermissionDto>> CreateRangePermissionAsync(List<PermissionCreateDto> createDtos)
        {
            var user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new ArgumentNullException("User is not admin");
            }
            var newPermissions = new List<Permission>();
            foreach (var createDto in createDtos)
            {
                var newPermission = _mapper.Map<Permission>(createDto);
                newPermission.Id = Guid.NewGuid();
                newPermission.CreatedDate = DateTime.UtcNow;
                newPermissions.Add(newPermission);
                await _customLogService.CreateCustomLog("Permission Given", newPermission.UserId, newPermission.BranchId, "User", "Branch");
            }
            await _permissionRepository.AddRangeAsync(newPermissions);
            await _unitOfWork.CommitAsync();
            return _permissionRepository.GetDtos(newPermissions);
        }

        public async Task DeletePermissionAsync(Guid permissionId)
        {
            var user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new ArgumentNullException("User is not admin");
            }
            var permission = await GetByIdAsync(permissionId);
            if (permission == null)
            {
                throw new ArgumentNullException("Permission is not found");
            }
            permission.DeletedDate = DateTime.UtcNow;
            _permissionRepository.Update(permission, permission);
            await _customLogService.CreateCustomLog("Permission taken", permission.UserId, permission.BranchId, "User", "Branch");
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangePermissionAsync(List<Guid> permissionIds)
        {
            var permissions = new List<Permission>();
            foreach (var permissionId in permissionIds)
            {
                var permission = await GetByIdAsync(permissionId);
                if (permission == null)
                {
                    throw new ArgumentNullException($"{permissionId} - Permission is not found");
                }
                permission.DeletedDate = DateTime.UtcNow;
                permissions.Add(permission);
                await _customLogService.CreateCustomLog("Permission taken", permission.UserId, permission.BranchId, "User", "Branch");
            }
            _permissionRepository.UpdateRange(permissions);
            await _unitOfWork.CommitAsync();
        }
    }
}
