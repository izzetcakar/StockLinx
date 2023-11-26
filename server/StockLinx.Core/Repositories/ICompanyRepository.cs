using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ICompanyRepository : IRepository<Company>
    {
        CompanyDto GetCompanyDto(Company company);
        List<CompanyDto> GetCompanyDtos(List<Company> companies);
        Task<List<CompanyDto>> GetAllCompanyDtos();
        Task CreateBaseAdmin();
    }
}
