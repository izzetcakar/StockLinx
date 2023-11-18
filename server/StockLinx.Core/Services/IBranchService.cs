using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IBranchService : IService<Branch>
    {
        Task CreateBranchAsync(BranchCreateDto createDto);
        Task CreateRangeBranchAsync(List<BranchCreateDto> createDtos);
        Task UpdateBranchAsync(BranchUpdateDto updateDto);
        Task DeleteBranchAsync(Guid branchId);
        Task DeleteRangeBranchAsync(List<Guid> branchIds);
    }
}
