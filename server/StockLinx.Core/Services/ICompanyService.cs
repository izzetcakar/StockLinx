using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ICompanyService : IService<Company>
    {
        Task<CompanyDto> GetDtoAsync(Guid id);
        Task<List<CompanyDto>> GetAllDtosAsync();
        Task<CompanyDto> CreateCompanyAsync(CompanyCreateDto dto);
        Task<List<CompanyDto>> CreateRangeCompanyAsync(List<CompanyCreateDto> dtos);
        Task<CompanyDto> UpdateCompanyAsync(CompanyUpdateDto dto);
        Task DeleteCompanyAsync(Guid id);
        Task DeleteRangeCompanyAsync(List<Guid> ids);
    }
}
