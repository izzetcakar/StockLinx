using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IModelService : IService<Model>
    {
        Task CreateModelAsync(ModelCreateDto createDto);
        Task UpdateModelAsync(ModelUpdateDto updateDto);
        Task DeleteModelAsync(Guid modelId);
    }
}
