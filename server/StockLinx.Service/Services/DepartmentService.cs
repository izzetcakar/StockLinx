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

            //Check if newDepartment.ImagePath is base64 or not and not null
            if (newDepartment.ImagePath != null && newDepartment.ImagePath.Contains("data:image/png;base64,"))
            {
                string base64 = newDepartment.ImagePath.Substring(newDepartment.ImagePath.IndexOf(',') + 1);
                string path = newDepartment.Name + DateTime.Now.ToString("yyyyMMddHHmmss");
                ImageHandler.UploadBase64AsFile(base64, path);
            }
            await AddAsync(newDepartment);
        }
        public async Task UpdateDepartmentAsync(DepartmentUpdateDto updateDto)
        {
            var departmentInDb = await GetByIdAsync(updateDto.Id);
            if (departmentInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the Department to update is null.");
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
                throw new ArgumentNullException(nameof(departmentId), "The ID of the Department to delete is null.");
            }
            var Department = await GetByIdAsync(departmentId);
            if (Department == null)
            {
                throw new ArgumentNullException(nameof(Department), "The Department to delete is null.");
            }
            await RemoveAsync(Department);
        }
    }
}
