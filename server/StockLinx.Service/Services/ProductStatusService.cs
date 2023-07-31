using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ProductStatusService : Service<ProductStatus>, IProductStatusService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IProductStatusRepository _productStatusRepository;
        public ProductStatusService(IRepository<ProductStatus> repository, IProductStatusRepository productStatusRepository, IMapper mapper, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
            _productStatusRepository = productStatusRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task CreateProductStatusAsync(ProductStatusCreateDto createDto)
        {
            var newProductStatus = _mapper.Map<ProductStatus>(createDto);
            newProductStatus.Id = Guid.NewGuid();
            newProductStatus.CreatedDate = DateTime.UtcNow;
            await AddAsync(newProductStatus);
        }
        public async Task UpdateProductStatusAsync(ProductStatusUpdateDto updateDto)
        {
            var productStatusInDb = await GetByIdAsync(updateDto.Id);
            if (productStatusInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the productStatus to update is null.");
            }
            var updatedProductStatus = _mapper.Map<ProductStatus>(updateDto);
            updatedProductStatus.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(productStatusInDb, updatedProductStatus);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteProductStatusAsync(Guid productStatusId)
        {
            if (productStatusId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(productStatusId), "The ID of the productStatus to delete is null.");
            }
            var productStatus = await GetByIdAsync(productStatusId);
            if (productStatus == null)
            {
                throw new ArgumentNullException(nameof(productStatus), "The productStatus to delete is null.");
            }
            await RemoveAsync(productStatus);
        }
    }
}
