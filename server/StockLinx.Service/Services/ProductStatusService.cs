using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ProductStatusService(IRepository<ProductStatus> repository, IUnitOfWork unitOfWork,
            IMapper mapper, IProductStatusRepository productStatusRepository) : base(repository, unitOfWork)
        {
            _productStatusRepository = productStatusRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<List<ProductStatusDto>> GetProductStatusDtos()
        {
            var productStatuses = await _productStatusRepository.GetAll().ToListAsync();
            var productStatusDtos = _mapper.Map<List<ProductStatusDto>>(productStatuses);
            return productStatusDtos;
        }
        public async Task CreateProductStatusAsync(ProductStatusCreateDto createDto)
        {
            if (createDto == null)
            {
                throw new ArgumentNullException(nameof(createDto), "The productStatus create DTO is null.");
            }

            var newProductStatus = _mapper.Map<ProductStatus>(createDto);
            var productStatusId = Guid.NewGuid();
            newProductStatus.Id = productStatusId;
            newProductStatus.CreatedDate = DateTime.UtcNow;
            await _productStatusRepository.AddAsync(newProductStatus);
            await _unitOfWork.CommitAsync();
        }
        public async Task UpdateProductStatusAsync(ProductStatusUpdateDto updateDto)
        {
            var productStatusInDb = await GetByIdAsync(updateDto.Id);
            if (productStatusInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the ProductStatus to update is null.");
            }
            var updatedProductStatus = _mapper.Map<ProductStatus>(updateDto);
            updatedProductStatus.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(productStatusInDb, updatedProductStatus);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteProductStatusAsync(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(id), "The ID of the ProductStatus to delete is null.");
            }
            var productStatus = await GetByIdAsync(id);
            if (productStatus == null)
            {
                throw new ArgumentNullException(nameof(productStatus), "The ProductStatus to delete is null.");
            }
            await RemoveAsync(productStatus);
        }
    }
}
