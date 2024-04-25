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

        public async Task<DepartmentDto> GetDtoAsync(Guid id)
        {
            var department = await GetByIdAsync(id);
            return _departmentRepository.GetDto(department);
        }

        public async Task<List<DepartmentDto>> GetAllDtosAsync()
        {
            return await _departmentRepository.GetAllDtosAsync();
        }

        public async Task<DepartmentDto> CreateDepartmentAsync(DepartmentCreateDto dto)
        {
            Department department = _mapper.Map<Department>(dto);
            department.Id = Guid.NewGuid();
            department.CreatedDate = DateTime.UtcNow;
            await _departmentRepository.AddAsync(department);
            await _customLogService.CreateCustomLog("Create", "Department", department.Name);
            await _unitOfWork.CommitAsync();
            return _departmentRepository.GetDto(department);
        }

        public async Task<List<DepartmentDto>> CreateRangeDepartmentAsync(List<DepartmentCreateDto> dtos)
        {
            List<Department> departments = new List<Department>();
            foreach (var dto in dtos)
            {
                Department department = _mapper.Map<Department>(dto);
                department.Id = Guid.NewGuid();
                department.CreatedDate = DateTime.UtcNow;
                departments.Add(department);
                await _customLogService.CreateCustomLog("Create", "Department", department.Name);
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
            await _customLogService.CreateCustomLog("Update", "Department", department.Name);
            await _unitOfWork.CommitAsync();
            return _departmentRepository.GetDto(department);
        }

        public async Task DeleteDepartmentAsync(Guid id)
        {
            var department = await GetByIdAsync(id);
            if (department == null)
            {
                throw new ArgumentNullException("Department is not found");
            }
            _departmentRepository.Remove(department);
            await _customLogService.CreateCustomLog("Delete", "Department", department.Name);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeDepartmentAsync(List<Guid> ids)
        {
            var departments = new List<Department>();
            foreach (var id in ids)
            {
                var department = await GetByIdAsync(id);
                if (department == null)
                {
                    throw new ArgumentNullException($"{id} - Department is not found");
                }
                departments.Add(department);
                await _customLogService.CreateCustomLog("Delete", "Department", department.Name);
            }
            _departmentRepository.RemoveRange(departments);
            await _unitOfWork.CommitAsync();
        }
    }
}
