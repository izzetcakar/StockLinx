using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IModelRepository : IRepository<Model>
    {
        ModelDto GetModelDto(Model model);
        List<ModelDto> GetModelDtos(List<Model> models);
        Task<List<ModelDto>> GetAllModelDtos();
    }
}
