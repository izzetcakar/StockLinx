using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ICompanyService : IService<Company>
    {
        Task<List<CompanyDto>> GetAllCompanyDtos();
        Task<CompanyDto> CreateCompanyAsync(CompanyCreateDto createDto);
        Task<List<CompanyDto>> CreateRangeCompanyAsync(List<CompanyCreateDto> createDtos);
        Task UpdateCompanyAsync(CompanyUpdateDto updateDto);
        Task DeleteCompanyAsync(Guid companyId);
        Task DeleteRangeCompanyAsync(List<Guid> companyIds);
        Task CreateBaseAdmin();
    }
}
