using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class CompanyService : Service<Company>, ICompanyService
    {
        public CompanyService(IRepository<Company> repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
        }
    }
}
