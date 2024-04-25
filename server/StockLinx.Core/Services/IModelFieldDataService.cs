using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IModelFieldDataService : IService<ModelFieldData>
    {
        Task<ModelFieldDataDto> GetDtoAsync(Guid id);
        Task<List<ModelFieldDataDto>> GetAllDtosAsync();
        Task<ModelFieldDataDto> CreateModelFieldDataAsync(ModelFieldDataDto dto);
        Task<List<ModelFieldDataDto>> CreateRangeModelFieldDataAsync(List<ModelFieldDataDto> dto);
        Task<ModelFieldDataDto> UpdateModelFieldDataAsync(ModelFieldDataDto dto);
        Task DeleteModelFieldDataAsync(Guid id);
        Task DeleteRangeModelFieldDataAsync(List<Guid> ids);
    }
}
