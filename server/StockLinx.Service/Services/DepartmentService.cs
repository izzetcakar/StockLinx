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

        public async Task<List<DepartmentDto>> GetDepartmentDtos()
        {
            var departments = await _departmentRepository.GetAll().Include(x => x.Branch)
                .Select(x => new DepartmentDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    BranchId = x.BranchId,
                    CompanyId = x.Branch.CompanyId,
                    ImagePath = x.ImagePath,
                    CreatedDate = x.CreatedDate,
                    UpdatedDate = x.UpdatedDate
                }).ToListAsync();
            return departments;
        }
        public async Task CreateDepartmentAsync(DepartmentCreateDto createDto)
        {
            var newDepartment = _mapper.Map<Department>(createDto);
            newDepartment.Id = Guid.NewGuid();
            newDepartment.CreatedDate = DateTime.UtcNow;
            await AddAsync(newDepartment);
        }

        public async Task CreateRangeDepartmentAsync(List<DepartmentCreateDto> createDtos)
        {
            var newDepartments = new List<Department>();
            foreach (var createDto in createDtos)
            {
                var newDepartment = _mapper.Map<Department>(createDto);
                newDepartment.Id = Guid.NewGuid();
                newDepartment.CreatedDate = DateTime.UtcNow;
                newDepartments.Add(newDepartment);
            }
            await AddRangeAsync(newDepartments);
        }

        public async Task UpdateDepartmentAsync(DepartmentUpdateDto updateDto)
        {
            var departmentInDb = await GetByIdAsync(updateDto.Id);
            if (departmentInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the department to update is null.");
            }
            var updatedDepartment = _mapper.Map<Department>(updateDto);
            updatedDepartment.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(departmentInDb, updatedDepartment);
            await _unitOfWork.CommitAsync();
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
