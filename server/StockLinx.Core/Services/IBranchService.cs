using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IBranchService : IService<Branch>
    {
        Task<BranchDto> GetDto(Guid id);
        Task<List<BranchDto>> GetAllDtos();
        Task<BranchDto> CreateBranchAsync(BranchCreateDto createDto);
        Task<List<BranchDto>> CreateRangeBranchAsync(List<BranchCreateDto> createDtos);
        Task UpdateBranchAsync(BranchUpdateDto updateDto);
        Task DeleteBranchAsync(Guid branchId);
        Task DeleteRangeBranchAsync(List<Guid> branchIds);
    }
}
