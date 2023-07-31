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
        private readonly ISupplierRepository _supplierRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public SupplierService(IRepository<Supplier> repository, ISupplierRepository supplierRepository,IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _supplierRepository = supplierRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task CreateSupplierAsync(SupplierCreateDto createDto)
        {
            var newSupplier = _mapper.Map<Supplier>(createDto);
            newSupplier.Id = Guid.NewGuid();
            newSupplier.CreatedDate = DateTime.UtcNow;

            //Check if newSupplier.ImagePath is base64 or not and not null
            if (newSupplier.ImagePath != null && newSupplier.ImagePath.Contains("data:image/png;base64,"))
            {
                string base64 = newSupplier.ImagePath.Substring(newSupplier.ImagePath.IndexOf(',') + 1);
                string path = newSupplier.Name + DateTime.Now.ToString("yyyyMMddHHmmss");
                ImageHandler.UploadBase64AsFile(base64, path);
            }
            await AddAsync(newSupplier);
        }
        public async Task UpdateSupplierAsync(SupplierUpdateDto updateDto)
        {
            var supplierInDb = await GetByIdAsync(updateDto.Id);
            if (supplierInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the Supplier to update is null.");
            }
            var updatedSupplier = _mapper.Map<Supplier>(updateDto);
            updatedSupplier.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(supplierInDb, updatedSupplier);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteSupplierAsync(Guid supplierId)
        {
            if (supplierId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(supplierId), "The ID of the Supplier to delete is null.");
            }
            var Supplier = await GetByIdAsync(supplierId);
            if (Supplier == null)
            {
                throw new ArgumentNullException(nameof(Supplier), "The Supplier to delete is null.");
            }
            await RemoveAsync(Supplier);
        }
    }
}
