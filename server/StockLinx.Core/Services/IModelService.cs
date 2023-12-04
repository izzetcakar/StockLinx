using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IModelService : IService<Model>
    {
        Task<ModelDto> GetDto(Guid id);
        Task<List<ModelDto>> GetAllDtos();
        Task<ModelDto> CreateModelAsync(ModelCreateDto createDto);
        Task<List<ModelDto>> CreateRangeModelAsync(List<ModelCreateDto> createDtos);
        Task UpdateModelAsync(ModelUpdateDto updateDto);
        Task DeleteModelAsync(Guid modelId);
        Task DeleteRangeModelAsync(List<Guid> modelIds);
    }
}
