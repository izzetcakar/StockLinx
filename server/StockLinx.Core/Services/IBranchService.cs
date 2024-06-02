using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IBranchService : IService<Branch>
    {
        Task<BranchDto> GetDtoAsync(Guid id);
        Task<List<BranchDto>> GetAllDtosAsync();
        Task<BranchDto> CreateBranchAsync(BranchCreateDto dto);
        Task<List<BranchDto>> CreateRangeBranchAsync(List<BranchCreateDto> dtos);
        Task<BranchDto> UpdateBranchAsync(BranchUpdateDto dto);
        Task DeleteBranchAsync(Guid id);
        Task DeleteRangeBranchAsync(List<Guid> ids);
        Task<List<BranchDto>> FilterAllAsync(string filter);
    }
}
