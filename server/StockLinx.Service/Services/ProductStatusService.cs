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

        public ProductStatusService(
            IRepository<ProductStatus> repository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IProductStatusRepository productStatusRepository,
            ICustomLogService customLogService
        )
            : base(repository, unitOfWork)
        {
            _productStatusRepository = productStatusRepository;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ProductStatusDto> GetDtoAsync(Guid id)
        {
            ProductStatus productStatus = await GetByIdAsync(id);
            if (productStatus == null)
            {
                throw new Exception("ProductStatus is not found");
            }
            return _productStatusRepository.GetDto(productStatus);
        }

        public async Task<List<ProductStatusDto>> GetAllDtosAsync()
        {
            return await _productStatusRepository.GetAllDtosAsync();
        }

        public async Task<ProductStatusDto> CreateProductStatusAsync(ProductStatusCreateDto dto)
        {
            ProductStatus productStatus = _mapper.Map<ProductStatus>(dto);
            productStatus.Id = Guid.NewGuid();
            productStatus.CreatedDate = DateTime.UtcNow;
            await _productStatusRepository.AddAsync(productStatus);
            await _customLogService.CreateCustomLog(
                "Create",
                "ProductStatus",
                productStatus.Id,
                productStatus.Name
            );
            await _unitOfWork.CommitAsync();
            return _productStatusRepository.GetDto(productStatus);
        }

        public async Task<List<ProductStatusDto>> CreateRangeProductStatusAsync(
            List<ProductStatusCreateDto> dtos
        )
        {
            List<ProductStatus> productStatuses = new List<ProductStatus>();
            foreach (ProductStatusCreateDto dto in dtos)
            {
                ProductStatus productStatus = _mapper.Map<ProductStatus>(dto);
                productStatus.Id = Guid.NewGuid();
                productStatus.CreatedDate = DateTime.UtcNow;
                productStatuses.Add(productStatus);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "ProductStatus",
                    productStatus.Id,
                    productStatus.Name
                );
            }
            await _productStatusRepository.AddRangeAsync(productStatuses);
            await _unitOfWork.CommitAsync();
            return _productStatusRepository.GetDtos(productStatuses);
        }

        public async Task<ProductStatusDto> UpdateProductStatusAsync(ProductStatusUpdateDto dto)
        {
            ProductStatus productStatusInDb = await GetByIdAsync(dto.Id);
            if (productStatusInDb == null)
            {
                throw new Exception("ProductStatus is not found");
            }
            ProductStatus productStatus = _mapper.Map<ProductStatus>(dto);
            productStatus.UpdatedDate = DateTime.UtcNow;
            _productStatusRepository.Update(productStatusInDb, productStatus);
            await _customLogService.CreateCustomLog(
                "Update",
                "ProductStatus",
                productStatus.Id,
                productStatus.Name
            );
            await _unitOfWork.CommitAsync();
            return _productStatusRepository.GetDto(productStatus);
        }

        public async Task DeleteProductStatusAsync(Guid id)
        {
            ProductStatus productStatus = await GetByIdAsync(id);
            if (productStatus == null)
            {
                throw new Exception("ProductStatus is not found");
            }
            _productStatusRepository.Remove(productStatus);
            await _customLogService.CreateCustomLog(
                "Delete",
                "ProductStatus",
                productStatus.Id,
                productStatus.Name
            );
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeProductStatusAsync(List<Guid> ids)
        {
            List<ProductStatus> productStatuses = new List<ProductStatus>();
            foreach (Guid id in ids)
            {
                ProductStatus productStatus = await GetByIdAsync(id);
                if (productStatus == null)
                {
                    throw new Exception($"{id} - ProductStatus is not found");
                }
                productStatuses.Add(productStatus);
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "ProductStatus",
                    productStatus.Id,
                    productStatus.Name
                );
            }
            _productStatusRepository.RemoveRange(productStatuses);
            await _unitOfWork.CommitAsync();
        }
    }
}
