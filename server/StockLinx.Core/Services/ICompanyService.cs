using StockLinx.Core.DTOs.Create;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ICompanyService : IService<Company>
    {
        Task CreateCompanyAsync(CompanyCreateDto createDto);
    }
}
