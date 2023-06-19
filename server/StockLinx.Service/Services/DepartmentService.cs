using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class DepartmentService : Service<Department>, IDepartmentService
    {
        public DepartmentService(IRepository<Department> repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
        }
    }
}
