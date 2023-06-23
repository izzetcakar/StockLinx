using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ICompanyService : IService<Company>
    {
        Task CreateCompanyAsync(CompanyCreateDto createDto);
        Task UpdateCompanyAsync(CompanyUpdateDto updateDto);
        Task DeleteCompanyAsync(Guid companyId);
    }
}
