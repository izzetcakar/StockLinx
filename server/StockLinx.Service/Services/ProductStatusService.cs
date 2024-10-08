﻿using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
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
        private readonly IFilterService<ProductStatus> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ProductStatusService(
            IRepository<ProductStatus> repository,
            IProductStatusRepository productStatusRepository,
            ICustomLogService customLogService,
            IFilterService<ProductStatus> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _productStatusRepository = productStatusRepository;
            _customLogService = customLogService;
            _filterService = filterService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ProductStatusDto> GetDtoAsync(Guid id)
        {
            ProductStatus productStatus = await GetByIdAsync(id);
            return _productStatusRepository.GetDto(productStatus);
        }

        public async Task<List<ProductStatusDto>> GetAllDtosAsync()
        {
            return await _productStatusRepository.GetAllDtosAsync();
        }

        public async Task<ProductStatusDto> CreateProductStatusAsync(ProductStatusCreateDto dto)
        {
            ProductStatus productStatus = _mapper.Map<ProductStatus>(dto);
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
            await _productStatusRepository.CanDeleteAsync(id);
            ProductStatus productStatus = await GetByIdAsync(id);
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
                await _productStatusRepository.CanDeleteAsync(id);
                ProductStatus productStatus = await GetByIdAsync(id);
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

        public async Task<List<ProductStatusDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return _productStatusRepository.GetDtos(result.ToList());
        }

        public async Task<List<ProductStatusDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            return await _productStatusRepository.GetDisplayDtos(ids);
        }
    }
}
