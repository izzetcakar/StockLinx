using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IModelService : IService<Model>
    {
        Task<ModelDto> GetDtoAsync(Guid id);
        Task<List<ModelDto>> GetAllDtosAsync();
        Task<ModelDto> CreateModelAsync(ModelCreateDto dto);
        Task<List<ModelDto>> CreateRangeModelAsync(List<ModelCreateDto> dtos);
        Task<ModelDto> UpdateModelAsync(ModelUpdateDto dto);
        Task DeleteModelAsync(Guid id);
        Task DeleteRangeModelAsync(List<Guid> ids);
        Task<List<ModelDto>> FilterAllAsync(string filter);
    }
}
