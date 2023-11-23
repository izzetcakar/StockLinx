using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IModelFieldDataService : IService<ModelFieldData>
    {
        Task<List<ModelFieldDataDto>> GetModelFieldDataDtos();
        Task CreateModelFieldDataAsync(ModelFieldDataCreateDto createDto);
        Task CreateRangeModelFieldDataAsync(List<ModelFieldDataCreateDto> createDtos);
        Task UpdateModelFieldDataAsync(ModelFieldDataUpdateDto updateDto);
        Task DeleteModelFieldDataAsync(Guid modelFieldDataId);
        Task DeleteRangeModelFieldDataAsync(List<Guid> modelFieldDataIds);
    }
}
