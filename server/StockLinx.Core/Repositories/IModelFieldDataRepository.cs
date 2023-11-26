using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IModelFieldDataRepository : IRepository<ModelFieldData>
    {
        ModelFieldDataDto GetModelFieldDataDto(ModelFieldData modelFieldData);
        List<ModelFieldDataDto> GetModelFieldDataDtos(List<ModelFieldData> modelFieldDatas);
        Task<List<ModelFieldDataDto>> GetAllModelFieldDataDtos();
    }
}
