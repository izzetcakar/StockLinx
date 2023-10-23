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
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public LicenseService(IRepository<License> repository, ILicenseRepository licenseRepository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _licenseRepository = licenseRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<List<LicenseDto>> GetLicenseDtos()
        {
            var licenses = await _licenseRepository.GetAll().Include(x => x.Branch)
            .Select(x => new LicenseDto
            {
                Id = x.Id,
                CompanyId = x.Branch.CompanyId,
                BranchId = x.BranchId,
                CategoryId = x.CategoryId,
                ProductStatusId = x.ProductStatusId,
                Name = x.Name,
                ImagePath = x.ImagePath,
                SerialNo = x.SerialNo,
                OrderNo = x.OrderNo,
                Notes = x.Notes,
                PurchaseDate = x.PurchaseDate,
                PurchaseCost = x.PurchaseCost,
                CheckinCounter = x.CheckinCounter,
                CheckoutCounter = x.CheckoutCounter,
                ManufacturerId = x.ManufacturerId,
                LicenseKey = x.LicenseKey,
                LicenseEmail = x.LicenseEmail,
                Maintained = x.Maintained,
                Reassignable = x.Reassignable,
                ExpirationDate = x.ExpirationDate,
                TerminationDate = x.TerminationDate,
                Quantity = x.Quantity,
                CreatedDate = x.CreatedDate,
                UpdatedDate = x.UpdatedDate,
            }).ToListAsync();
            return licenses;
        }
        public async Task CreateLicenseAsync(LicenseCreateDto createDto)
        {
            var newLicense = _mapper.Map<License>(createDto);
            newLicense.Id = Guid.NewGuid();
            newLicense.CreatedDate = DateTime.UtcNow;

            //Check if newLicense.ImagePath is base64 or not and not null
            if (newLicense.ImagePath != null && newLicense.ImagePath.Contains("data:image/png;base64,"))
            {
                string base64 = newLicense.ImagePath.Substring(newLicense.ImagePath.IndexOf(',') + 1);
                string path = newLicense.Name + DateTime.Now.ToString("yyyyMMddHHmmss");
                ImageHandler.UploadBase64AsFile(base64, path);
            }
            await AddAsync(newLicense);
        }
        public async Task UpdateLicenseAsync(LicenseUpdateDto updateDto)
        {
            var licenseInDb = await GetByIdAsync(updateDto.Id);
            if (licenseInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the License to update is null.");
            }
            var updatedLicense = _mapper.Map<License>(updateDto);
            updatedLicense.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(licenseInDb, updatedLicense);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteLicenseAsync(Guid licenseId)
        {
            if (licenseId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(licenseId), "The ID of the License to delete is null.");
            }
            var License = await GetByIdAsync(licenseId);
            if (License == null)
            {
                throw new ArgumentNullException(nameof(License), "The License to delete is null.");
            }
            await RemoveAsync(License);
        }
        public async Task<ProductCounter> GetAllCountAsync()
        {
            var licenses = await GetAllAsync();
            var licenseCount = licenses.Count();
            return new ProductCounter { EntityName = "Licenses", Count = licenseCount };
        }

        public async Task<List<ProductStatusCounter>> GetStatusCount()
        {
            var licenses = await _licenseRepository.GetAll().Include(x => x.ProductStatus).ToListAsync();
            var productStatusCounts = licenses
                .Where(license => license.ProductStatus != null)
                .GroupBy(license => license.ProductStatus.Type)
                .Select(group => new ProductStatusCounter
                {
                    Status = group.Key.ToString(),
                    Count = group.Count()
                })
                .ToList();

            return productStatusCounts;
        }
    }
}
