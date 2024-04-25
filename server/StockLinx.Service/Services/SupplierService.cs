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

        public SupplierService(
            IRepository<Supplier> repository,
            ISupplierRepository supplierRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ICustomLogService customLogService
        )
            : base(repository, unitOfWork)
        {
            _supplierRepository = supplierRepository;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<SupplierDto> GetDtoAsync(Guid id)
        {
            Supplier supplier = await GetByIdAsync(id);
            if (supplier == null)
            {
                throw new Exception("Supplier is not found");
            }
            return _supplierRepository.GetDto(supplier);
        }

        public async Task<List<SupplierDto>> GetAllDtosAsync()
        {
            return await _supplierRepository.GetAllDtosAsync();
        }

        public async Task<SupplierDto> CreateSupplierAsync(SupplierCreateDto dto)
        {
            Supplier supplier = _mapper.Map<Supplier>(dto);
            supplier.Id = Guid.NewGuid();
            supplier.CreatedDate = DateTime.UtcNow;

            if (supplier.ImagePath != null)
            {
                if (supplier.ImagePath.Contains("base64,"))
                {
                    ImageHandler.UploadBase64AsJpg(
                        supplier.ImagePath,
                        $"{supplier.Id}",
                        "Suppliers"
                    );
                    supplier.ImagePath = $"Suppliers/{supplier.Id}.jpg";
                }
            }

            await _supplierRepository.AddAsync(supplier);
            await _customLogService.CreateCustomLog(
                "Create",
                "Supplier",
                supplier.Id,
                supplier.Name
            );
            await _unitOfWork.CommitAsync();
            return _supplierRepository.GetDto(supplier);
        }

        public async Task<List<SupplierDto>> CreateRangeSupplierAsync(List<SupplierCreateDto> dtos)
        {
            List<Supplier> suppliers = new List<Supplier>();
            foreach (SupplierCreateDto dto in dtos)
            {
                Supplier supplier = _mapper.Map<Supplier>(dto);
                supplier.Id = Guid.NewGuid();
                supplier.CreatedDate = DateTime.UtcNow;
                suppliers.Add(supplier);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "Supplier",
                    supplier.Id,
                    supplier.Name
                );
            }
            await _supplierRepository.AddRangeAsync(suppliers);
            return _supplierRepository.GetDtos(suppliers);
        }

        public async Task<SupplierDto> UpdateSupplierAsync(SupplierUpdateDto dto)
        {
            Supplier supplierInDb = await GetByIdAsync(dto.Id);
            if (supplierInDb == null)
            {
                throw new Exception("Supplier is not found");
            }
            Supplier supplier = _mapper.Map<Supplier>(dto);
            supplier.UpdatedDate = DateTime.UtcNow;

            if (supplier.ImagePath != null)
            {
                if (supplier.ImagePath.Contains("base64,"))
                {
                    ImageHandler.UploadBase64AsJpg(
                        supplier.ImagePath,
                        $"{supplier.Id}",
                        "Suppliers"
                    );
                    supplier.ImagePath = $"Suppliers/{supplier.Id}.jpg";
                }
            }

            _supplierRepository.Update(supplierInDb, supplier);
            await _customLogService.CreateCustomLog(
                "Update",
                "Supplier",
                supplier.Id,
                supplier.Name
            );
            await _unitOfWork.CommitAsync();
            return _supplierRepository.GetDto(supplier);
        }

        public async Task DeleteSupplierAsync(Guid id)
        {
            Supplier supplier = await GetByIdAsync(id);
            if (supplier == null)
            {
                throw new Exception("Supplier is not found");
            }
            _supplierRepository.Remove(supplier);
            await _customLogService.CreateCustomLog(
                "Delete",
                "Supplier",
                supplier.Id,
                supplier.Name
            );
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeSupplierAsync(List<Guid> ids)
        {
            List<Supplier> suppliers = new List<Supplier>();
            foreach (Guid id in ids)
            {
                Supplier supplier = await GetByIdAsync(id);
                if (supplier == null)
                {
                    throw new Exception("Supplier is not found");
                }
                suppliers.Add(supplier);
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "Supplier",
                    supplier.Id,
                    supplier.Name
                );
            }
            _supplierRepository.RemoveRange(suppliers);
            await _unitOfWork.CommitAsync();
        }
    }
}
