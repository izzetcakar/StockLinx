using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class LicenseService : Service<License>, ILicenseService
    {
        private readonly ILicenseRepository _licenseRepository;
        private readonly IDeployedProductRepository _deployedProductRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public LicenseService(IRepository<License> repository, ILicenseRepository licenseRepository, IUnitOfWork unitOfWork,
             IMapper mapper, IDeployedProductRepository deployedProductRepository, ICustomLogService customLogService) : base(repository, unitOfWork)
        {
            _licenseRepository = licenseRepository;
            _deployedProductRepository = deployedProductRepository;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<LicenseDto> GetDto(Guid id)
        {
            var license = await GetByIdAsync(id);
            return await _licenseRepository.GetDto(license);
        }

        public async Task<List<LicenseDto>> GetAllDtos()
        {
            return await _licenseRepository.GetAllDtos();
        }
        public async Task<LicenseDto> CreateLicenseAsync(LicenseCreateDto createDto)
        {
            var newLicense = _mapper.Map<License>(createDto);
            newLicense.Id = Guid.NewGuid();
            newLicense.CreatedDate = DateTime.UtcNow;
            await _licenseRepository.AddAsync(newLicense);
            await _customLogService.CreateCustomLog("Create", newLicense.Id, newLicense.BranchId, "License", "Branch");
            await _unitOfWork.CommitAsync();
            return await _licenseRepository.GetDto(newLicense);
        }

        public async Task<List<LicenseDto>> CreateRangeLicenseAsync(List<LicenseCreateDto> createDtos)
        {
            var newLicenses = new List<License>();
            foreach (var createDto in createDtos)
            {
                var newLicense = _mapper.Map<License>(createDto);
                newLicense.Id = Guid.NewGuid();
                newLicense.CreatedDate = DateTime.UtcNow;
                newLicenses.Add(newLicense);
                await _customLogService.CreateCustomLog("Create", newLicense.Id, newLicense.BranchId, "License", "Branch");
            }
            await _licenseRepository.AddRangeAsync(newLicenses);
            await _unitOfWork.CommitAsync();
            return await _licenseRepository.GetDtos(newLicenses);
        }

        public async Task<LicenseDto> UpdateLicenseAsync(LicenseUpdateDto updateDto)
        {
            var licenseInDb = await GetByIdAsync(updateDto.Id);
            if (licenseInDb == null)
            {
                throw new ArgumentNullException("License is not found");
            }
            var updatedLicense = _mapper.Map<License>(updateDto);
            updatedLicense.UpdatedDate = DateTime.UtcNow;
            _licenseRepository.Update(licenseInDb, updatedLicense);
            await _customLogService.CreateCustomLog("Update", updatedLicense.Id, updatedLicense.BranchId, "License", "Branch");
            await _unitOfWork.CommitAsync();
            return await _licenseRepository.GetDto(updatedLicense);
        }

        public async Task DeleteLicenseAsync(Guid licenseId)
        {
            var license = await GetByIdAsync(licenseId);
            if (license == null)
            {
                throw new ArgumentNullException("License is not found");
            }
            _licenseRepository.Update(license, license);
            await _customLogService.CreateCustomLog("Delete", license.Id, license.BranchId, "License", "Branch");
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeLicenseAsync(List<Guid> licenseIds)
        {
            var licenses = new List<License>();
            foreach (var licenseId in licenseIds)
            {
                var license = await GetByIdAsync(licenseId);
                if (license == null)
                {
                    throw new ArgumentNullException($"{licenseId} - License is not found");
                }
                licenses.Add(license);
                await _customLogService.CreateCustomLog("Delete", license.Id, license.BranchId, "License", "Branch");
            }
            _licenseRepository.UpdateRange(licenses);
            await _unitOfWork.CommitAsync();
        }

        public async Task<LicenseCheckInResponseDto> CheckIn(LicenseCheckInDto checkInDto)
        {
            var license = await _licenseRepository.GetByIdAsync(checkInDto.LicenseId);
            if (license == null)
            {
                throw new Exception("License is not found");
            }
            var deployedProducts = await _deployedProductRepository.GetAll().ToListAsync();
            var availableQuantity = license.Quantity - deployedProducts.Count(d => d.LicenseId.HasValue && d.LicenseId == license.Id);
            if (availableQuantity < 1)
            {
                throw new Exception("License is out of stock");
            }
            var deployedProduct = new DeployedProduct
            {
                Id = Guid.NewGuid(),
                LicenseId = checkInDto.LicenseId,
                UserId = checkInDto.UserId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Notes = checkInDto.Notes,
            };
            await _deployedProductRepository.AddAsync(deployedProduct);
            await _customLogService.CreateCustomLog("CheckIn", license.Id, deployedProduct.UserId, "License", "User");
            await _unitOfWork.CommitAsync();
            var licenseDto = await _licenseRepository.GetDto(license);
            var deployedProductDto = await _deployedProductRepository.GetDto(deployedProduct);
            return new LicenseCheckInResponseDto
            {
                License = licenseDto,
                DeployedProduct = deployedProductDto
            };
        }

        public async Task<LicenseDto> CheckOut(Guid id)
        {
            var deployedProduct = await _deployedProductRepository.Where(d => d.LicenseId.HasValue && d.Id == id).SingleOrDefaultAsync();
            if (deployedProduct == null)
            {
                throw new Exception("Deployed product is not found");
            }
            var license = await _licenseRepository.GetByIdAsync(deployedProduct.LicenseId);
            if (license == null)
            {
                throw new Exception("License is not found");
            }
            _deployedProductRepository.Update(deployedProduct, deployedProduct);
            await _customLogService.CreateCustomLog("CheckOut", license.Id, license.BranchId, "License", "Branch");
            await _unitOfWork.CommitAsync();
            return await _licenseRepository.GetDto(license);
        }
    }
}
