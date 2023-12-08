using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IModelFieldDataService : IService<ModelFieldData>
    {
        Task<ModelFieldDataDto> GetDto(Guid id);
        Task<List<ModelFieldDataDto>> GetAllDtos();
        Task<ModelFieldDataDto> CreateModelFieldDataAsync(ModelFieldDataDto dto);
        Task<List<ModelFieldDataDto>> CreateRangeModelFieldDataAsync(List<ModelFieldDataDto> dto);
        Task<ModelFieldDataDto> UpdateModelFieldDataAsync(ModelFieldDataDto dto);
        Task DeleteModelFieldDataAsync(Guid modelFieldDataId);
        Task DeleteRangeModelFieldDataAsync(List<Guid> modelFieldDataIds);
    }
}
