using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IFieldSetRepository : IRepository<FieldSet>
    {
        FieldSetDto GetDto(FieldSet entity);
        List<FieldSetDto> GetDtos(List<FieldSet> entities);
        Task<List<FieldSetDto>> GetAllDtos();
    }
}
