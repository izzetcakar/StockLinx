using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ICompanyRepository : IRepository<Company>
    {
        CompanyDto GetDto(Company entity);
        List<CompanyDto> GetDtos(List<Company> entities);
        Task<List<CompanyDto>> GetAllDtosAsync();
        Task CanDeleteAsync(Guid id);
        Task<List<CompanyDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
