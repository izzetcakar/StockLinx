using StockLinx.Core.Entities;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;

namespace StockLinx.Core.Repositories
{
    public interface IModelRepository : IRepository<Model>
    {
        ModelDto GetDto(Model entity);
        List<ModelDto> GetDtos(List<Model> entities);
        Task<List<ModelDto>> GetAllDtos();
        ModelDto CreateModel(ModelCreateDto dto);
        void UpdateModel(ModelUpdateDto dto);
    }
}
