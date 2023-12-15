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
    public class ProductStatusService : Service<ProductStatus>, IProductStatusService
    {
        private readonly IProductStatusRepository _productStatusRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ProductStatusService(IRepository<ProductStatus> repository, IUnitOfWork unitOfWork,
            IMapper mapper, IProductStatusRepository productStatusRepository, ICustomLogService customLogService) : base(repository, unitOfWork)
        {
            _productStatusRepository = productStatusRepository;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ProductStatusDto> GetDto(Guid id)
        {
            var productStatus = await GetByIdAsync(id);
            return _productStatusRepository.GetDto(productStatus);
        }

        public async Task<List<ProductStatusDto>> GetAllDtos()
        {
            return await _productStatusRepository.GetAllDtos();
        }
        public async Task<ProductStatusDto> CreateProductStatusAsync(ProductStatusCreateDto createDto)
        {
            var newProductStatus = _mapper.Map<ProductStatus>(createDto);
            newProductStatus.Id = Guid.NewGuid();
            newProductStatus.CreatedDate = DateTime.UtcNow;
            await _productStatusRepository.AddAsync(newProductStatus);
            await _customLogService.CreateCustomLog("Create", newProductStatus.Id, null, "ProductStatus", null);
            await _unitOfWork.CommitAsync();
            return _productStatusRepository.GetDto(newProductStatus);
        }

        public async Task<List<ProductStatusDto>> CreateRangeProductStatusAsync(List<ProductStatusCreateDto> createDtos)
        {
            var newProductStatuses = new List<ProductStatus>();
            foreach (var createDto in createDtos)
            {
                var newProductStatus = _mapper.Map<ProductStatus>(createDto);
                newProductStatus.Id = Guid.NewGuid();
                newProductStatus.CreatedDate = DateTime.UtcNow;
                newProductStatuses.Add(newProductStatus);
                await _customLogService.CreateCustomLog("Create", newProductStatus.Id, null, "ProductStatus", null);
            }
            await _productStatusRepository.AddRangeAsync(newProductStatuses);
            await _unitOfWork.CommitAsync();
            return _productStatusRepository.GetDtos(newProductStatuses);
        }

        public async Task<ProductStatusDto> UpdateProductStatusAsync(ProductStatusUpdateDto updateDto)
        {
            var productStatusInDb = await GetByIdAsync(updateDto.Id);
            if (productStatusInDb == null)
            {
                throw new ArgumentNullException("ProductStatus is not found");
            }
            var updatedProductStatus = _mapper.Map<ProductStatus>(updateDto);
            updatedProductStatus.UpdatedDate = DateTime.UtcNow;
            _productStatusRepository.Update(productStatusInDb, updatedProductStatus);
            await _customLogService.CreateCustomLog("Update", updatedProductStatus.Id, null, "ProductStatus", null);
            await _unitOfWork.CommitAsync();
            return _productStatusRepository.GetDto(updatedProductStatus);
        }

        public async Task DeleteProductStatusAsync(Guid productStatusId)
        {
            var productStatus = await GetByIdAsync(productStatusId);
            if (productStatus == null)
            {
                throw new ArgumentNullException("ProductStatus is not found");
            }
            productStatus.DeletedDate = DateTime.UtcNow;
            _productStatusRepository.Update(productStatus, productStatus);
            await _customLogService.CreateCustomLog("Delete", productStatus.Id, null, "ProductStatus", null);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeProductStatusAsync(List<Guid> productStatusIds)
        {
            var productStatuses = new List<ProductStatus>();
            foreach (var productStatusId in productStatusIds)
            {
                var productStatus = await GetByIdAsync(productStatusId);
                if (productStatus == null)
                {
                    throw new ArgumentNullException($"{productStatusId} - ProductStatus is not found");
                }
                productStatus.DeletedDate = DateTime.UtcNow;
                productStatuses.Add(productStatus);
                await _customLogService.CreateCustomLog("Delete", productStatus.Id, null, "ProductStatus", null);
            }
            _productStatusRepository.UpdateRange(productStatuses);
            await _unitOfWork.CommitAsync();
        }
    }
}
