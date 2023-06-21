using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class DepartmentService : Service<Department>, IDepartmentService
    {
        private readonly IMapper _mapper;
        public DepartmentService(IRepository<Department> repository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task CreateDepartmentAsync(DepartmentCreateDto createDto)
        {
            var newDepartment = _mapper.Map<Department>(createDto);
            newDepartment.Id = Guid.NewGuid();
            await AddAsync(newDepartment);
        }
    }
}
