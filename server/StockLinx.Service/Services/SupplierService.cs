using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
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
        public SupplierService(IRepository<Supplier> repository, ISupplierRepository supplierRepository,
            IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _supplierRepository = supplierRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<List<SupplierDto>> GetAllDtos()
        {
            return await _supplierRepository.GetAllDtos();
        }
        public async Task<SupplierDto> CreateSupplierAsync(SupplierCreateDto createDto)
        {
            var newSupplier = _mapper.Map<Supplier>(createDto);
            newSupplier.Id = Guid.NewGuid();
            newSupplier.CreatedDate = DateTime.UtcNow;
            var added = await AddAsync(newSupplier);
            return _supplierRepository.GetDto(added);
        }

        public async Task<List<SupplierDto>> CreateRangeSupplierAsync(List<SupplierCreateDto> createDtos)
        {
            var newSuppliers = new List<Supplier>();
            foreach (var createDto in createDtos)
            {
                var newSupplier = _mapper.Map<Supplier>(createDto);
                newSupplier.Id = Guid.NewGuid();
                newSupplier.CreatedDate = DateTime.UtcNow;
                newSuppliers.Add(newSupplier);
            }
            var added = await AddRangeAsync(newSuppliers);
            return _supplierRepository.GetDtos(added.ToList());
        }

        public async Task UpdateSupplierAsync(SupplierUpdateDto updateDto)
        {
            var supplierInDb = await GetByIdAsync(updateDto.Id);
            if (supplierInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the supplier to update is null.");
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
                throw new ArgumentNullException(nameof(supplierId), $"The ID of the supplier to delete is null.");
            }
            var supplier = await GetByIdAsync(supplierId);
            if (supplier == null)
            {
                throw new ArgumentNullException(nameof(supplier), $"The supplier to delete is null.");
            }
            await RemoveAsync(supplier);
        }

        public async Task DeleteRangeSupplierAsync(List<Guid> supplierIds)
        {
            var suppliers = new List<Supplier>();
            foreach (var supplierId in supplierIds)
            {
                var supplier = GetByIdAsync(supplierId).Result;
                suppliers.Add(supplier);
            }
            await RemoveRangeAsync(suppliers);
        }
    }
}
