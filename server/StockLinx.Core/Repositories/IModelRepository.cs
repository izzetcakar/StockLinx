using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IModelRepository : IRepository<Model>
    {
        ModelDto GetDto(Model entity);
        List<ModelDto> GetDtos(List<Model> entities);
        Task<List<ModelDto>> GetAllDtosAsync();
    }
}
