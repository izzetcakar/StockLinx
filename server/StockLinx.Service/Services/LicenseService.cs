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
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public LicenseService(IRepository<License> repository, ILicenseRepository licenseRepository,
            IUnitOfWork unitOfWork, IMapper mapper, IDeployedProductRepository deployedProductRepository) : base(repository, unitOfWork)
        {
            _licenseRepository = licenseRepository;
            _deployedProductRepository = deployedProductRepository;

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
            var added = await AddAsync(newLicense);
            return await _licenseRepository.GetDto(added);
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
            }
            var added = await AddRangeAsync(newLicenses);
            return await _licenseRepository.GetDtos(added.ToList());
        }

        public async Task<LicenseDto> UpdateLicenseAsync(LicenseUpdateDto updateDto)
        {
            var licenseInDb = await GetByIdAsync(updateDto.Id);
            if (licenseInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the license to update is null.");
            }
            var updatedLicense = _mapper.Map<License>(updateDto);
            updatedLicense.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(licenseInDb, updatedLicense);
            var license = await GetByIdAsync(updateDto.Id);
            return await _licenseRepository.GetDto(license);
        }

        public async Task DeleteLicenseAsync(Guid licenseId)
        {
            if (licenseId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(licenseId), $"The ID of the license to delete is null.");
            }
            var license = await GetByIdAsync(licenseId);
            if (license == null)
            {
                throw new ArgumentNullException(nameof(license), $"The license to delete is null.");
            }
            await RemoveAsync(license);
        }

        public async Task DeleteRangeLicenseAsync(List<Guid> licenseIds)
        {
            var licenses = new List<License>();
            foreach (var licenseId in licenseIds)
            {
                var license = GetByIdAsync(licenseId).Result;
                licenses.Add(license);
            }
            await RemoveRangeAsync(licenses);
        }

        public async Task<LicenseCheckInResponseDto> CheckIn(LicenseCheckInDto checkInDto)
        {
            try
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
                var licenseDto = await _licenseRepository.GetDto(license);
                var deployedProductDto = _deployedProductRepository.GetDto(deployedProduct);
                await _unitOfWork.CommitAsync();
                return new LicenseCheckInResponseDto
                {
                    License = licenseDto,
                    DeployedProduct = deployedProductDto
                };
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<LicenseDto> CheckOut(Guid id)
        {
            try
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
                _deployedProductRepository.Remove(deployedProduct);
                var licenseDto = await _licenseRepository.GetDto(license);
                await _unitOfWork.CommitAsync();
                return licenseDto;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
