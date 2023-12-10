using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class BranchRepository : Repository<Branch>, IBranchRepository
    {
        private readonly IMapper _mapper;
        public BranchRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }


        public BranchDto GetDto(Branch entity)
        {
            return _mapper.Map<BranchDto>(entity);
        }

        public List<BranchDto> GetDtos(List<Branch> entities)
        {
            List<BranchDto> dtos = new List<BranchDto>();
            dtos = _mapper.Map<List<BranchDto>>(entities);
            return dtos;
        }
        public async Task<List<BranchDto>> GetAllDtos()
        {
            var entities = await dbContext.Branches.Where(b => b.DeletedDate == null).AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
