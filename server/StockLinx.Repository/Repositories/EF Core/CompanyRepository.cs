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
            var entities = await dbContext.Companies.Where(c => c.DeletedDate == null).AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
