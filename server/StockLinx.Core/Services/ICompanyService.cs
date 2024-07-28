using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
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
        Task<List<CompanyDto>> FilterAllAsync(string filter);
        Task CheckTagExistAsync(string tag);
        Task CheckTagExistAsync(List<string> tags);
        Task<List<CompanyDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
