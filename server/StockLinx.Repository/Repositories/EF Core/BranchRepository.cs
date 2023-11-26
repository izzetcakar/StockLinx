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


        public BranchDto GetBranchDto(Branch branch)
        {
            return _mapper.Map<BranchDto>(branch);
        }

        public List<BranchDto> GetBranchDtos(List<Branch> branches)
        {
            List<BranchDto> branchDtos = new List<BranchDto>();
            branchDtos = _mapper.Map<List<BranchDto>>(branches);
            return branchDtos;
        }
        public async Task<List<BranchDto>> GetAllBranchDtos()
        {
            var branches = await dbContext.Branches.AsNoTracking().ToListAsync();
            return GetBranchDtos(branches);
        }
    }
}
