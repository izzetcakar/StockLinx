using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IBranchRepository : IRepository<Branch>
    {
        BranchDto GetBranchDto(Branch branch);
        List<BranchDto> GetBranchDtos(List<Branch> branches);
        Task<List<BranchDto>> GetAllBranchDtos();
    }
}
