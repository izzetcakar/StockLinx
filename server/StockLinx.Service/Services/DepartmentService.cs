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
    public class DepartmentService : Service<Department>, IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IPermissionService _permissionService;
        private readonly IFilterService<Department> _filterService;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public DepartmentService(
            IRepository<Department> repository,
            IDepartmentRepository departmentRepository,
            IPermissionService permissionService,
            IFilterService<Department> filterService,
            ICustomLogService customLogService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _departmentRepository = departmentRepository;
            _permissionService = permissionService;
            _filterService = filterService;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<DepartmentDto> GetDtoAsync(Guid id)
        {
            Department department = await GetByIdAsync(id);
            await _permissionService.VerifyCompanyAccessAsync(department.CompanyId);
            return _departmentRepository.GetDto(department);
        }

        public async Task<List<DepartmentDto>> GetAllDtosAsync()
        {
            List<Guid> companyIds = await _permissionService.GetCompanyIdsAsync();
            return await _departmentRepository.GetAllDtosAsync(companyIds);
        }

        public async Task<DepartmentDto> CreateDepartmentAsync(DepartmentCreateDto dto)
        {
            await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
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
                await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
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
            await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
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
            await _permissionService.VerifyCompanyAccessAsync(department.CompanyId);
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
                await _permissionService.VerifyCompanyAccessAsync(department.CompanyId);
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
            var list = _departmentRepository.GetDtos(result.ToList());
            List<Guid> companyIds = await _permissionService.GetCompanyIdsAsync();
            return list.Where(x => companyIds.Contains(x.CompanyId)).ToList();
        }
    }
}
