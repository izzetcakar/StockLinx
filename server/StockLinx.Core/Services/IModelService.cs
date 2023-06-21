using StockLinx.Core.DTOs.Create;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IModelService : IService<Model>
    {
        Task CreateModelAsync(ModelCreateDto createDto);
    }
}
