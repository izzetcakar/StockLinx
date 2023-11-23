using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IModelFieldDataService : IService<ModelFieldData>
    {
        Task<List<ModelFieldDataDto>> GetModelFieldDataDtos();
        Task CreateModelFieldDataAsync(ModelFieldDataDto dto);
        Task CreateRangeModelFieldDataAsync(List<ModelFieldDataDto> dto);
        Task UpdateModelFieldDataAsync(ModelFieldDataDto dto);
        Task DeleteModelFieldDataAsync(Guid modelFieldDataId);
        Task DeleteRangeModelFieldDataAsync(List<Guid> modelFieldDataIds);
    }
}
