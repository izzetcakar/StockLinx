using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IFieldSetRepository : IRepository<FieldSet>
    {
        FieldSetDto GetFieldSetDto(FieldSet fieldSet);
        List<FieldSetDto> GetFieldSetDtos(List<FieldSet> fieldSets);
        Task<List<FieldSetDto>> GetAllFieldSetDtos();
    }
}
