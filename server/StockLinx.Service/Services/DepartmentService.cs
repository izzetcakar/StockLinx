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
        private readonly ICustomLogService _customLogService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public DepartmentService(IRepository<Department> repository, IDepartmentRepository departmentRepository,
            IUnitOfWork unitOfWork, IMapper mapper, ICustomLogService customLogService) : base(repository, unitOfWork)
        {
            _departmentRepository = departmentRepository;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<DepartmentDto> GetDto(Guid id)
        {
            var department = await GetByIdAsync(id);
            return _departmentRepository.GetDto(department);
        }

        public async Task<List<DepartmentDto>> GetAllDtos()
        {
            return await _departmentRepository.GetAllDtos();
        }

        public async Task<DepartmentDto> CreateDepartmentAsync(DepartmentCreateDto createDto)
        {
            var newDepartment = _mapper.Map<Department>(createDto);
            newDepartment.Id = Guid.NewGuid();
            newDepartment.CreatedDate = DateTime.UtcNow;
            await _departmentRepository.AddAsync(newDepartment);
            await _customLogService.CreateCustomLog("Create", newDepartment.Id, newDepartment.BranchId, "Department", "Branch");
            await _unitOfWork.CommitAsync();
            return _departmentRepository.GetDto(newDepartment);
        }

        public async Task<List<DepartmentDto>> CreateRangeDepartmentAsync(List<DepartmentCreateDto> createDtos)
        {
            var newDepartments = new List<Department>();
            foreach (var createDto in createDtos)
            {
                var newDepartment = _mapper.Map<Department>(createDto);
                newDepartment.Id = Guid.NewGuid();
                newDepartment.CreatedDate = DateTime.UtcNow;
                newDepartments.Add(newDepartment);
                await _customLogService.CreateCustomLog("Create", newDepartment.Id, newDepartment.BranchId, "Department", "Branch");
            }
            await _departmentRepository.AddRangeAsync(newDepartments);
            await _unitOfWork.CommitAsync();
            return _departmentRepository.GetDtos(newDepartments);
        }

        public async Task<DepartmentDto> UpdateDepartmentAsync(DepartmentUpdateDto updateDto)
        {
            var departmentInDb = await GetByIdAsync(updateDto.Id);
            var updatedDepartment = _mapper.Map<Department>(updateDto);
            updatedDepartment.UpdatedDate = DateTime.UtcNow;
            _departmentRepository.Update(departmentInDb, updatedDepartment);
            await _customLogService.CreateCustomLog("Update", updatedDepartment.Id, updatedDepartment.BranchId, "Department", "Branch");
            await _unitOfWork.CommitAsync();
            return _departmentRepository.GetDto(updatedDepartment);
        }

        public async Task DeleteDepartmentAsync(Guid departmentId)
        {
            var department = await GetByIdAsync(departmentId);
            if (department == null)
            {
                throw new ArgumentNullException("Department is not found");
            }
            department.DeletedDate = DateTime.UtcNow;
            _departmentRepository.Update(department, department);
            await _customLogService.CreateCustomLog("Delete", department.Id, null, "Department", null);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeDepartmentAsync(List<Guid> departmentIds)
        {
            var departments = new List<Department>();
            foreach (var departmentId in departmentIds)
            {
                var department = await GetByIdAsync(departmentId);
                department.DeletedDate = DateTime.UtcNow;
                departments.Add(department);
                await _customLogService.CreateCustomLog("Delete", department.Id, null, "Department", null);
            }
            _departmentRepository.UpdateRange(departments);
            await _unitOfWork.CommitAsync();
        }
    }
}
