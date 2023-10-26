using AutoMapper;
using Microsoft.EntityFrameworkCore;
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

        public async Task<List<PermissionDto>> GetPermissionDtos()
        {
            var permissiones = await _permissionRepository.GetAll().ToListAsync();
            var permissionDtos = _mapper.Map<List<PermissionDto>>(permissiones);
            return permissionDtos;
        }
        public async Task CreatePermissionAsync(PermissionCreateDto createDto)
        {
            if (createDto == null)
            {
                throw new ArgumentNullException(nameof(createDto), "The permission create DTO is null.");
            }

            var newPermission = _mapper.Map<Permission>(createDto);
            var permissionId = Guid.NewGuid();
            newPermission.Id = permissionId;
            newPermission.CreatedDate = DateTime.UtcNow;
            await _permissionRepository.AddAsync(newPermission);
            await _unitOfWork.CommitAsync();
        }
        public async Task UpdatePermissionAsync(PermissionUpdateDto updateDto)
        {
            var permissionInDb = await GetByIdAsync(updateDto.Id);
            if (permissionInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the Permission to update is null.");
            }
            var updatedPermission = _mapper.Map<Permission>(updateDto);
            updatedPermission.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(permissionInDb, updatedPermission);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeletePermissionAsync(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(id), "The ID of the Permission to delete is null.");
            }
            var permission = await GetByIdAsync(id);
            if (permission == null)
            {
                throw new ArgumentNullException(nameof(permission), "The Permission to delete is null.");
            }
            await RemoveAsync(permission);
        }
    }
}
