using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class DepartmentRepository : Repository<Department>, IDepartmentRepository
    {
        private readonly IMapper _mapper;
        public DepartmentRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }


        public DepartmentDto GetDto(Department entity)
        {
            return _mapper.Map<DepartmentDto>(entity);
        }

        public List<DepartmentDto> GetDtos(List<Department> entities)
        {
            var dtos = new List<DepartmentDto>();
            dtos = _mapper.Map<List<DepartmentDto>>(entities);
            return dtos;
        }
        public async Task<List<DepartmentDto>> GetAllDtos()
        {
            var entities = await dbContext.Departments.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
