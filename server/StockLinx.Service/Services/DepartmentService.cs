﻿using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;
using StockLinx.Repository.Repositories.EF_Core;

namespace StockLinx.Service.Services
{
    public class DepartmentService : Service<Department>, IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IFilterService<Department> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public DepartmentService(
            IRepository<Department> repository,
            IDepartmentRepository departmentRepository,
            ICustomLogService customLogService,
            IFilterService<Department> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _departmentRepository = departmentRepository;
            _customLogService = customLogService;
            _filterService = filterService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<DepartmentDto> GetDtoAsync(Guid id)
        {
            Department department = await GetByIdAsync(id);
            return _departmentRepository.GetDto(department);
        }

        public async Task<List<DepartmentDto>> GetAllDtosAsync()
        {
            return await _departmentRepository.GetAllDtosAsync();
        }

        public async Task<DepartmentDto> CreateDepartmentAsync(DepartmentCreateDto dto)
        {
            Department department = _mapper.Map<Department>(dto);
            await _departmentRepository.AddAsync(department);
            await _customLogService.CreateCustomLog(
                "Create",
                "Department",
                department.Id,
                department.Name
            );
            await _unitOfWork.CommitAsync();
            return _departmentRepository.GetDto(department);
        }

        public async Task<List<DepartmentDto>> CreateRangeDepartmentAsync(
            List<DepartmentCreateDto> dtos
        )
        {
            List<Department> departments = new List<Department>();
            foreach (DepartmentCreateDto dto in dtos)
            {
                Department department = _mapper.Map<Department>(dto);
                departments.Add(department);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "Department",
                    department.Id,
                    department.Name
                );
            }
            await _departmentRepository.AddRangeAsync(departments);
            await _unitOfWork.CommitAsync();
            return _departmentRepository.GetDtos(departments);
        }

        public async Task<DepartmentDto> UpdateDepartmentAsync(DepartmentUpdateDto dto)
        {
            Department departmentInDb = await GetByIdAsync(dto.Id);
            Department department = _mapper.Map<Department>(dto);
            department.UpdatedDate = DateTime.UtcNow;
            _departmentRepository.Update(departmentInDb, department);
            await _customLogService.CreateCustomLog(
                "Update",
                "Department",
                department.Id,
                department.Name
            );
            await _unitOfWork.CommitAsync();
            return _departmentRepository.GetDto(department);
        }

        public async Task DeleteDepartmentAsync(Guid id)
        {
            Department department = await GetByIdAsync(id);
            _departmentRepository.Remove(department);
            await _customLogService.CreateCustomLog(
                "Delete",
                "Department",
                department.Id,
                department.Name
            );
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeDepartmentAsync(List<Guid> ids)
        {
            List<Department> departments = new List<Department>();
            foreach (Guid id in ids)
            {
                Department department = await GetByIdAsync(id);
                departments.Add(department);
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "Department",
                    department.Id,
                    department.Name
                );
            }
            _departmentRepository.RemoveRange(departments);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<DepartmentDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return _departmentRepository.GetDtos(result.ToList());
        }
    }
}
