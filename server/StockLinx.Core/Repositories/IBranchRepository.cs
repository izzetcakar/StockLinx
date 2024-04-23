using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IBranchRepository : IRepository<Branch>
    {
        BranchDto GetDto(Branch entity);
        List<BranchDto> GetDtos(List<Branch> entities);
        Task<List<BranchDto>> GetAllDtos();
        Task<bool> CanDelete(Guid id);
    }
}
