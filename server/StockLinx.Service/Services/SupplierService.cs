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
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public SupplierService(IRepository<Supplier> repository, ISupplierRepository supplierRepository,
            IUnitOfWork unitOfWork, IMapper mapper, ICustomLogService customLogService) : base(repository, unitOfWork)
        {
            _supplierRepository = supplierRepository;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<SupplierDto> GetDto(Guid id)
        {
            var supplier = await GetByIdAsync(id);
            return _supplierRepository.GetDto(supplier);
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

            if (newSupplier.ImagePath != null)
            {
                if (newSupplier.ImagePath.Contains("base64,"))
                {
                    ImageHandler.UploadBase64AsJpg(newSupplier.ImagePath, $"{newSupplier.Id}", "Suppliers");
                    newSupplier.ImagePath = $"Suppliers/{newSupplier.Id}.jpg";
                }
            }

            await _supplierRepository.AddAsync(newSupplier);
            await _customLogService.CreateCustomLog("Create", newSupplier.Id, null, "Supplier", null);
            await _unitOfWork.CommitAsync();
            return _supplierRepository.GetDto(newSupplier);
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
                await _customLogService.CreateCustomLog("Create", newSupplier.Id, null, "Supplier", null);
            }
            await _supplierRepository.AddRangeAsync(newSuppliers);
            return _supplierRepository.GetDtos(newSuppliers);
        }

        public async Task<SupplierDto> UpdateSupplierAsync(SupplierUpdateDto updateDto)
        {
            var supplierInDb = await GetByIdAsync(updateDto.Id);
            if (supplierInDb == null)
            {
                throw new ArgumentNullException("Supplier is not found");
            }
            var updatedSupplier = _mapper.Map<Supplier>(updateDto);
            updatedSupplier.UpdatedDate = DateTime.UtcNow;

            if (updatedSupplier.ImagePath != null)
            {
                if (updatedSupplier.ImagePath.Contains("base64,"))
                {
                    ImageHandler.UploadBase64AsJpg(updatedSupplier.ImagePath, $"{updatedSupplier.Id}", "Suppliers");
                    updatedSupplier.ImagePath = $"Suppliers/{updatedSupplier.Id}.jpg";
                }
            }

            _supplierRepository.Update(supplierInDb, updatedSupplier);
            await _customLogService.CreateCustomLog("Update", updatedSupplier.Id, null, "Supplier", null);
            await _unitOfWork.CommitAsync();
            return _supplierRepository.GetDto(updatedSupplier);
        }

        public async Task DeleteSupplierAsync(Guid supplierId)
        {
            var supplier = await GetByIdAsync(supplierId);
            if (supplier == null)
            {
                throw new ArgumentNullException("Supplier is not found");
            }
            _supplierRepository.Update(supplier, supplier);
            await _customLogService.CreateCustomLog("Delete", supplier.Id, null, "Supplier", null);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeSupplierAsync(List<Guid> supplierIds)
        {
            var suppliers = new List<Supplier>();
            foreach (var supplierId in supplierIds)
            {
                var supplier = await GetByIdAsync(supplierId);
                if (supplier == null)
                {
                    throw new ArgumentNullException($"{supplierId} - Supplier is not found");
                }
                suppliers.Add(supplier);
                await _customLogService.CreateCustomLog("Delete", supplier.Id, null, "Supplier", null);
            }
            _supplierRepository.UpdateRange(suppliers);
            await _unitOfWork.CommitAsync();
        }
    }
}
