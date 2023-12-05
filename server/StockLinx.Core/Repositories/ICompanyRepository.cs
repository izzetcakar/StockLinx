using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ICompanyRepository : IRepository<Company>
    {
        CompanyDto GetDto(Company entity);
        List<CompanyDto> GetDtos(List<Company> entities);
        Task<List<CompanyDto>> GetAllDtos();
    }
}
