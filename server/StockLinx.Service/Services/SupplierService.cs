using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class SupplierService : Service<Supplier>, ISupplierService
    {
        private readonly IMapper _mapper;
        public SupplierService(IRepository<Supplier> repository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task CreateSupplierAsync(SupplierCreateDto createDto)
        {
            var newSupplier = _mapper.Map<Supplier>(createDto);
            newSupplier.Id = Guid.NewGuid();
            await AddAsync(newSupplier);
        }
        public Task UpdateSupplierAsync(SupplierUpdateDto updateDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteSupplierAsync(Guid supplierId)
        {
            throw new NotImplementedException();
        }

    }
}
