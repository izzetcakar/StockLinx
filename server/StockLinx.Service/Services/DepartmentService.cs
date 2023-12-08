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
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public DepartmentService(IRepository<Department> repository, IDepartmentRepository departmentRepository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _departmentRepository = departmentRepository;
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
            var addedDepartment = await AddAsync(newDepartment);
            return _departmentRepository.GetDto(addedDepartment);
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
            }
            var addedDepartments = await AddRangeAsync(newDepartments);
            return _departmentRepository.GetDtos(addedDepartments.ToList());
        }

        public async Task<DepartmentDto> UpdateDepartmentAsync(DepartmentUpdateDto updateDto)
        {
            var departmentInDb = await GetByIdAsync(updateDto.Id);
            if (departmentInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the department to update is null.");
            }
            var updatedDepartment = _mapper.Map<Department>(updateDto);
            updatedDepartment.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(departmentInDb, updatedDepartment);
            var department = await GetByIdAsync(updateDto.Id);
            return _departmentRepository.GetDto(department);
        }

        public async Task DeleteDepartmentAsync(Guid departmentId)
        {
            if (departmentId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(departmentId), $"The ID of the department to delete is null.");
            }
            var department = await GetByIdAsync(departmentId);
            if (department == null)
            {
                throw new ArgumentNullException(nameof(department), $"The department to delete is null.");
            }
            await RemoveAsync(department);
        }

        public async Task DeleteRangeDepartmentAsync(List<Guid> departmentIds)
        {
            var departments = new List<Department>();
            foreach (var departmentId in departmentIds)
            {
                var department = GetByIdAsync(departmentId).Result;
                departments.Add(department);
            }
            await RemoveRangeAsync(departments);
        }
    }
}
