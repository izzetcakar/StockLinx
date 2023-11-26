using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class CompanyRepository : Repository<Company>, ICompanyRepository
    {
        private readonly IMapper _mapper;
        public CompanyRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task CreateBaseAdmin()
        {
            var companies = await dbContext.Companies.ToListAsync();
            if (companies.Count != 0) return;
            var newCompany = new Company();
            newCompany.Id = Guid.NewGuid();
            newCompany.CreatedDate = DateTime.UtcNow;
            newCompany.Name = "Özyer";
            dbContext.Companies.Add(newCompany);
            var newBranch = new Branch();
            newBranch.Id = Guid.NewGuid();
            newBranch.CreatedDate = DateTime.UtcNow;
            newBranch.CompanyId = newCompany.Id;
            newBranch.Name = "Özyer Merkez";
            dbContext.Branches.Add(newBranch);
            var newDepartment = new Department();
            newDepartment.Id = Guid.NewGuid();
            newDepartment.CreatedDate = DateTime.UtcNow;
            newDepartment.BranchId = newBranch.Id;
            newDepartment.Name = "IFS";
            dbContext.Departments.Add(newDepartment);
            var newUser = new User();
            newUser.Id = Guid.NewGuid();
            newUser.CreatedDate = DateTime.UtcNow;
            newUser.DepartmentId = newDepartment.Id;
            newUser.Email = "admin@gmail.com";
            newUser.Password = "123";
            newUser.FirstName = "adminF";
            newUser.LastName = "adminL";
            newUser.EmployeeNo = "111";
            newUser.StartDate = DateTime.UtcNow;
            dbContext.Users.Add(newUser);
        }
        public CompanyDto GetDto(Company entity)
        {
            return _mapper.Map<CompanyDto>(entity);
        }
        public List<CompanyDto> GetDtos(List<Company> entities)
        {
            var dtos = new List<CompanyDto>();
            dtos = _mapper.Map<List<CompanyDto>>(entities);
            return dtos;
        }
        public async Task<List<CompanyDto>> GetAllDtos()
        {
            var entities = await dbContext.Companies.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
