using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class EmployeeRepository : Repository<Employee>, IEmployeeRepository
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IEmployeeProductRepository _employeeProductRepository;
        private readonly IAssetProductRepository _assetProductRepository;

        public EmployeeRepository(AppDbContext dbContext, IMapper mapper, IUserService userService,
            IEmployeeProductRepository employeeProductRepository, IAssetProductRepository assetProductRepository)
            : base(dbContext)
        {
            _mapper = mapper;
            _userService = userService;
            _employeeProductRepository = employeeProductRepository;
            _assetProductRepository = assetProductRepository;
        }

        public async Task<EmployeeDto> GetDtoAsync(Employee entity)
        {
            var dto = _mapper.Map<EmployeeDto>(entity);
            dto.CompanyId = await dbContext
                .Departments.Where(b => b.Id == dto.DepartmentId)
                .Select(b => b.CompanyId)
                .FirstOrDefaultAsync();
            return dto;
        }

        public async Task<List<EmployeeDto>> GetDtosAsync(IEnumerable<Employee> entities)
        {
            var dtos = new List<EmployeeDto>();
            foreach (var entity in entities)
            {
                var dto = await GetDtoAsync(entity);
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<List<EmployeeDto>> GetAllDtosAsync()
        {
            List<Employee> entities = await dbContext.Employees.AsNoTracking().ToListAsync();
            return await GetDtosAsync(entities);
        }

        public async Task<List<EmployeeDto>> GetAllDtosAsync(List<Guid> companyIds)
        {
            List<Employee> entities = await dbContext
                .Employees.Where(a => companyIds.Contains(a.Department.CompanyId))
                .AsNoTracking()
                .ToListAsync();
            return await GetDtosAsync(entities);
        }

        public async Task CanDeleteAsync(Guid id)
        {
            var employeeProducts = await dbContext.EmployeeProducts.AnyAsync(dp =>
                dp.EmployeeId == id
            );
            if (employeeProducts)
            {
                throw new Exception("Employee has deployed items");
            }
        }

        public async Task<Guid> GetCompanyIdAsync(Guid employeeId)
        {
            return await dbContext
                .Departments.Where(b =>
                    b.Id
                    == dbContext
                        .Employees.Where(u => u.Id == employeeId)
                        .Select(u => u.DepartmentId)
                        .FirstOrDefault()
                )
                .Select(b => b.CompanyId)
                .FirstOrDefaultAsync();
        }

        public async Task<List<EmployeeDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            var query = dbContext
                .Employees.Where(e => ids.Contains(e.Id))
                .Select(e => new EmployeeDisplayDto
                {
                    FirstName = e.FirstName,
                    LastName = e.LastName,
                    Company = e.Department.Company.Name,
                    Department = e.Department.Name,
                    JobTitle = e.JobTitle,
                    StartDate = e.StartDate,
                    EndDate = e.EndDate,
                    PhoneNo = e.PhoneNo,
                    Notes = e.Notes
                });
            return await query.ToListAsync();
        }

        private string GetAssetProductType(AssetProduct assetProduct)
        {
            if (assetProduct.ComponentId != null)
            {
                return "Component";
            }
            if (assetProduct.LicenseId != null)
            {
                return "License";
            }
            return "";
        }

        private string GetEmployeeProductType(EmployeeProduct employeeProduct)
        {
            if (employeeProduct.AccessoryId != null)
            {
                return "Accessory";
            }
            if (employeeProduct.AssetId != null)
            {
                return "Asset";
            }
            if (employeeProduct.Consumable != null)
            {
                return "Consumable";
            }
            if (employeeProduct.LicenseId != null)
            {
                return "License";
            }
            return "";
        }

        public async Task<SubmissionDto> GetSubmissionDto(Guid employeeId)
        {
            var user = await _userService.GetCurrentUser();
            var employee = await GetByIdAsync(employeeId);
            var department = await dbContext.Departments
                .Where(d => d.Id == employee.DepartmentId)
                .FirstOrDefaultAsync();
            var company = await dbContext.Companies
                .Where(c => c.Id == department.CompanyId)
                .FirstOrDefaultAsync();

            SubmissionDto submission = new SubmissionDto
            {
                Company = company.Name,
                Department = department.Name,
                Employee = $"{employee.FirstName} {employee.LastName}",
                EmployeeTitle = employee.JobTitle,
                EmployeeStartDate = employee.StartDate.ToString("MM/dd/yyyy"),
                User = user.FirstName + " " + user.LastName,
                Products = new List<SubmissionProductDto>()
            };

            var employeeProducts = await dbContext.EmployeeProducts
                .Where(dp => dp.EmployeeId == employeeId)
                .ToListAsync();
            var assetProductIds = employeeProducts.Where(ep => ep.AssetId != null).Select(ep => ep.AssetId).ToList();

            if (assetProductIds.Any())
            {
                var assetProducts = await dbContext.AssetProducts
                    .Where(dp => assetProductIds.Contains(dp.AssetId))
                    .ToListAsync();

                foreach (var dp in assetProducts)
                {
                    var tag = await _assetProductRepository.GetProductTag(dp);
                    var desc = await _assetProductRepository.GetProductDescription(dp);
                    submission.Products.Add(new SubmissionProductDto
                    {
                        Type = GetAssetProductType(dp),
                        Tag = tag,
                        Quantity = dp.Quantity,
                        Description = desc
                    });
                }
            }

            if (employeeProducts.Any())
            {
                foreach (var dp in employeeProducts)
                {
                    var tag = await _employeeProductRepository.GetProductTag(dp);
                    var desc = await _employeeProductRepository.GetroductDescription(dp);
                    submission.Products.Add(new SubmissionProductDto
                    {
                        Type = GetEmployeeProductType(dp),
                        Tag = tag,
                        Quantity = dp.Quantity,
                        Description = desc
                    });
                }
            }

            return submission;
        }

    }
}