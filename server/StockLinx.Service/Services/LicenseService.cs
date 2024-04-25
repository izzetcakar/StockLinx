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
        private readonly IBranchRepository _branchRepository;
        private readonly IUserService _userService;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public LicenseService(
            IRepository<License> repository,
            ILicenseRepository licenseRepository,
            IDeployedProductRepository deployedProductRepository,
            IBranchRepository branchRepository,
            IUserService userService,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ICustomLogService customLogService
        )
            : base(repository, unitOfWork)
        {
            _licenseRepository = licenseRepository;
            _deployedProductRepository = deployedProductRepository;
            _branchRepository = branchRepository;
            _userService = userService;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<LicenseDto> GetDtoAsync(Guid id)
        {
            var license = await GetByIdAsync(id);
            return await _licenseRepository.GetDtoAsync(license);
        }

        public async Task<List<LicenseDto>> GetAllDtosAsync()
        {
            return await _licenseRepository.GetAllDtosAsync();
        }

        public async Task<LicenseDto> CreateLicenseAsync(LicenseCreateDto dto)
        {
            var license = _mapper.Map<License>(dto);
            license.Id = Guid.NewGuid();
            license.CreatedDate = DateTime.UtcNow;
            await _licenseRepository.AddAsync(license);
            await _customLogService.CreateCustomLog("Create","License",license.Name);
            await _unitOfWork.CommitAsync();
            return await _licenseRepository.GetDtoAsync(license);
        }

        public async Task<List<LicenseDto>> CreateRangeLicenseAsync(
            List<LicenseCreateDto> createDtos
        )
        {
            var licenses = new List<License>();
            foreach (var createDto in createDtos)
            {
                var license = _mapper.Map<License>(createDto);
                license.Id = Guid.NewGuid();
                license.CreatedDate = DateTime.UtcNow;
                licenses.Add(license);
                await _customLogService.CreateCustomLog("Create","License",license.Name);
            }
            await _licenseRepository.AddRangeAsync(licenses);
            await _unitOfWork.CommitAsync();
            return await _licenseRepository.GetDtosAsync(licenses);
        }

        public async Task<LicenseDto> UpdateLicenseAsync(LicenseUpdateDto dto)
        {
            var licenseInDb = await GetByIdAsync(dto.Id);
            if (licenseInDb == null)
            {
                throw new ArgumentNullException("License is not found");
            }
            License license = _mapper.Map<License>(dto);
            license.UpdatedDate = DateTime.UtcNow;
            _licenseRepository.Update(licenseInDb, license);
            await _customLogService.CreateCustomLog("Update","License",license.Name);
            await _unitOfWork.CommitAsync();
            return await _licenseRepository.GetDtoAsync(license);
        }

        public async Task DeleteLicenseAsync(Guid id)
        {
            var license = await GetByIdAsync(id);
            if (license == null)
            {
                throw new ArgumentNullException("License is not found");
            }
            bool canDelete = await _licenseRepository.CanDeleteAsync(id);
            if (canDelete)
            {
            _licenseRepository.Remove(license);
            await _customLogService.CreateCustomLog("Delete","License",license.Name);
            await _unitOfWork.CommitAsync();
            }
        }

        public async Task DeleteRangeLicenseAsync(List<Guid> ids)
        {
            var licenses = new List<License>();
            foreach (var id in ids)
            {
                var license = await GetByIdAsync(id);
                if (license == null)
                {
                    throw new ArgumentNullException($"{id} - License is not found");
                }
                bool canDelete = await _licenseRepository.CanDeleteAsync(id);
                if (canDelete)
                {
                    licenses.Add(license);
                    await _customLogService.CreateCustomLog("Delete","License",license.Name);
                }
}
            _licenseRepository.RemoveRange(licenses);
            await _unitOfWork.CommitAsync();
        }

        public async Task<DeployedProductDto> CheckInAsync(ProductCheckInDto checkInDto)
        {
            User user = await _userService.GetByIdAsync(checkInDto.UserId);
            var license = await _licenseRepository.GetByIdAsync(checkInDto.ProductId);
            if (license == null)
            {
                throw new Exception("License not found");
            }
            int availableQuantity = await _licenseRepository.GetAvaliableQuantityAsync(license);
            if (availableQuantity < 1)
            {
                throw new Exception("License is out of stock");
            }
            if (checkInDto.Quantity < availableQuantity)
            {
                throw new Exception("License stock is not enough");
            }
            DeployedProduct deployedProduct = new DeployedProduct
            {
                Id = Guid.NewGuid(),
                LicenseId = license.Id,
                UserId = checkInDto.UserId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Quantity = availableQuantity,
                Notes = checkInDto.Notes,
            };
            await _deployedProductRepository.AddAsync(deployedProduct);
            await _customLogService.CreateCustomLog("CheckIn", "License", license.Name, "User", user.FirstName + user.LastName);
            await _unitOfWork.CommitAsync();
            DeployedProductDto deployedProductDto = await _deployedProductRepository.GetDtoAsync(deployedProduct);
            return deployedProductDto;
        }

        public async Task CheckOutAsync(Guid id)
        {
            var license = await _licenseRepository.GetByIdAsync(id);
            if (license == null)
            {
                throw new Exception("License is not found");
            }
            List<DeployedProduct> deployedProducts = await _deployedProductRepository.GetAll().Where(dp => dp.LicenseId == id).ToListAsync();
            var deployedProduct = deployedProducts.Find(dp => dp.LicenseId == id);
            if (deployedProduct == null)
            {
                throw new Exception("Deployed product is not found");
            }
            _deployedProductRepository.Remove(deployedProduct);
            await _customLogService.CreateCustomLog("CheckOut", "License", deployedProduct.License.Name);
            await _unitOfWork.CommitAsync();
        }
    }
}
