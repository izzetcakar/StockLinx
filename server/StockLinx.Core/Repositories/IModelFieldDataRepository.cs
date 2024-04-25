using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IModelFieldDataRepository : IRepository<ModelFieldData>
    {
        ModelFieldDataDto GetDto(ModelFieldData entity);
        List<ModelFieldDataDto> GetDtos(List<ModelFieldData> entities);
        Task<List<ModelFieldDataDto>> GetAllDtosAsync();
    }
}
