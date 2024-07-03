﻿using AutoMapper;
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
        private readonly IFilterService<Permission> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public PermissionService(
            IRepository<Permission> repository,
            IPermissionRepository permissionRepository,
            IUserService userService,
            ICustomLogService customLogService,
            IFilterService<Permission> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _permissionRepository = permissionRepository;
            _userService = userService;
            _customLogService = customLogService;
            _filterService = filterService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<PermissionDto> GetDtoAsync(Guid id)
        {
            User user = await _userService.GetCurrentUser();
            bool isAdmin = (bool)user.IsAdmin;
            if (!isAdmin)
            {
                throw new Exception("User is not admin");
            }
            Permission permission = await GetByIdAsync(id);
            return _permissionRepository.GetDto(permission);
        }

        public async Task<List<PermissionDto>> GetAllDtosAsync()
        {
            User user = await _userService.GetCurrentUser();
            bool isAdmin = (bool)user.IsAdmin;
            if (!isAdmin)
            {
                return new List<PermissionDto>();
            }
            return await _permissionRepository.GetAllDtosAsync();
        }

        public async Task<PermissionDto> CreatePermissionAsync(PermissionCreateDto dto)
        {
            User user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new Exception("User is not admin");
            }
            Permission permission = _mapper.Map<Permission>(dto);
            await _permissionRepository.AddAsync(permission);
            await _customLogService.CreateCustomLog(
                "Permission Given",
                "Permission",
                permission.Id,
                permission.Company.Name
            );
            await _unitOfWork.CommitAsync();
            return _permissionRepository.GetDto(permission);
        }

        public async Task<List<PermissionDto>> CreateRangePermissionAsync(
            List<PermissionCreateDto> dtos
        )
        {
            User user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new Exception("User is not admin");
            }
            List<Permission> permissions = new List<Permission>();
            foreach (PermissionCreateDto dto in dtos)
            {
                Permission permission = _mapper.Map<Permission>(dto);
                permissions.Add(permission);
                await _customLogService.CreateCustomLog(
                    "Permission Given",
                    "Permission",
                    permission.Id,
                    permission.Company.Name
                );
            }
            await _permissionRepository.AddRangeAsync(permissions);
            await _unitOfWork.CommitAsync();
            return _permissionRepository.GetDtos(permissions);
        }

        public async Task DeletePermissionAsync(Guid id)
        {
            User user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new Exception("User is not admin");
            }
            Permission permission = await GetByIdAsync(id);
            _permissionRepository.Remove(permission);
            await _customLogService.CreateCustomLog(
                "Permission taken",
                "Permission",
                permission.Id,
                permission.Company.Name
            );
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangePermissionAsync(List<Guid> ids)
        {
            List<Permission> permissions = new List<Permission>();
            foreach (Guid id in ids)
            {
                Permission permission = await GetByIdAsync(id);
                permissions.Add(permission);
                await _customLogService.CreateCustomLog(
                    "Permission taken",
                    "Permission",
                    permission.Id,
                    permission.Company.Name
                );
            }
            _permissionRepository.RemoveRange(permissions);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<PermissionDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return _permissionRepository.GetDtos(result.ToList());
        }
    }
}
