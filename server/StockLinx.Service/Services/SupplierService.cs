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
        private readonly IFilterService<Supplier> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public SupplierService(
            IRepository<Supplier> repository,
            ISupplierRepository supplierRepository,
            ICustomLogService customLogService,
            IFilterService<Supplier> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _supplierRepository = supplierRepository;
            _customLogService = customLogService;
            _filterService = filterService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<SupplierDto> GetDtoAsync(Guid id)
        {
            Supplier supplier = await GetByIdAsync(id);
            return _supplierRepository.GetDto(supplier);
        }

        public async Task<List<SupplierDto>> GetAllDtosAsync()
        {
            return await _supplierRepository.GetAllDtosAsync();
        }

        public async Task<SupplierDto> CreateSupplierAsync(SupplierCreateDto dto)
        {
            Supplier supplier = new Supplier()
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = null,
                ContactEmail = dto.ContactEmail,
                ContactName = dto.ContactName,
                ContactPhone = dto.ContactPhone,
                Fax = dto.Fax,
                LocationId = dto.LocationId,
                Notes = dto.Notes,
                Website = dto.Website,
            };
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
                Supplier supplier = new Supplier()
                {
                    Id = Guid.NewGuid(),
                    Name = dto.Name,
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate = null,
                    ContactEmail = dto.ContactEmail,
                    ContactName = dto.ContactName,
                    ContactPhone = dto.ContactPhone,
                    Fax = dto.Fax,
                    LocationId = dto.LocationId,
                    Notes = dto.Notes,
                    Website = dto.Website,
                };
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
            Supplier supplier = _mapper.Map<Supplier>(dto);
            supplier.UpdatedDate = DateTime.UtcNow;

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

        public async Task<List<SupplierDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return _supplierRepository.GetDtos(result.ToList());
        }
    }
}
