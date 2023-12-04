using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class PermissionService : Service<Permission>, IPermissionService
    {
        private readonly IPermissionRepository _permissionRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public PermissionService(IRepository<Permission> repository, IUnitOfWork unitOfWork,
            IMapper mapper, IPermissionRepository permissionRepository) : base(repository, unitOfWork)
        {
            _permissionRepository = permissionRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<PermissionDto> GetDto(Guid id)
        {
            var permission = await GetByIdAsync(id);
            return _permissionRepository.GetDto(permission);
        }

        public async Task<List<PermissionDto>> GetAllDtos()
        {
            return await _permissionRepository.GetAllDtos();
        }

        public async Task<PermissionDto> CreatePermissionAsync(PermissionCreateDto createDto)
        {
            var newPermission = _mapper.Map<Permission>(createDto);
            newPermission.Id = Guid.NewGuid();
            newPermission.CreatedDate = DateTime.UtcNow;
            var added = await AddAsync(newPermission);
            return _permissionRepository.GetDto(added);
        }

        public async Task<List<PermissionDto>> CreateRangePermissionAsync(List<PermissionCreateDto> createDtos)
        {
            var newPermissions = new List<Permission>();
            foreach (var createDto in createDtos)
            {
                var newPermission = _mapper.Map<Permission>(createDto);
                newPermission.Id = Guid.NewGuid();
                newPermission.CreatedDate = DateTime.UtcNow;
                newPermissions.Add(newPermission);
            }
            var added = await AddRangeAsync(newPermissions);
            return _permissionRepository.GetDtos(added.ToList());
        }

        public async Task UpdatePermissionAsync(PermissionUpdateDto updateDto)
        {
            var permissionInDb = await GetByIdAsync(updateDto.Id);
            if (permissionInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the permission to update is null.");
            }
            var updatedPermission = _mapper.Map<Permission>(updateDto);
            updatedPermission.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(permissionInDb, updatedPermission);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeletePermissionAsync(Guid permissionId)
        {
            if (permissionId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(permissionId), $"The ID of the permission to delete is null.");
            }
            var permission = await GetByIdAsync(permissionId);
            if (permission == null)
            {
                throw new ArgumentNullException(nameof(permission), $"The permission to delete is null.");
            }
            await RemoveAsync(permission);
        }

        public async Task DeleteRangePermissionAsync(List<Guid> permissionIds)
        {
            var permissions = new List<Permission>();
            foreach (var permissionId in permissionIds)
            {
                var permission = GetByIdAsync(permissionId).Result;
                permissions.Add(permission);
            }
            await RemoveRangeAsync(permissions);
        }
    }
}
