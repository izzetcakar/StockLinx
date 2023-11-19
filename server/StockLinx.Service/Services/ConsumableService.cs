﻿using AutoMapper;
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
    public class ConsumableService : Service<Consumable>, IConsumableService
    {
        private readonly IConsumableRepository _consumableRepository;
        private readonly IDeployedProductRepository _deployedProductRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ConsumableService(IRepository<Consumable> repository, IConsumableRepository consumableRepository, IDeployedProductRepository deployedProductRepository,
            IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _consumableRepository = consumableRepository;
            _deployedProductRepository = deployedProductRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<List<ConsumableDto>> GetConsumableDtos()
        {
            var deployedProducts = await _deployedProductRepository.GetAll().ToListAsync();
            var consumables = await _consumableRepository.GetAll().Include(x => x.Branch).ToListAsync();
            var consumableDtos = consumables
                .Select(x => new ConsumableDto
                {
                    Id = x.Id,
                    CompanyId = x.Branch.CompanyId,
                    BranchId = x.BranchId,
                    CategoryId = x.CategoryId,
                    ManufacturerId = x.ManufacturerId,
                    SupplierId = x.SupplierId,
                    Name = x.Name,
                    ImagePath = x.ImagePath,
                    OrderNo = x.OrderNo,
                    Notes = x.Notes,
                    PurchaseDate = x.PurchaseDate,
                    PurchaseCost = x.PurchaseCost,
                    CheckinCounter = x.CheckinCounter,
                    CheckoutCounter = x.CheckoutCounter,
                    Quantity = x.Quantity,
                    AvailableQuantity = x.Quantity - deployedProducts
                .Where(d => d.ConsumableId.HasValue && d.ConsumableId == x.Id)
                .Count(),
                    ItemNo = x.ItemNo,
                    ModelNo = x.ModelNo,
                    CreatedDate = x.CreatedDate,
                    UpdatedDate = x.UpdatedDate,
                }).ToList();
            return consumableDtos;
        }
        public async Task CreateConsumableAsync(ConsumableCreateDto createDto)
        {
            var newConsumable = _mapper.Map<Consumable>(createDto);
            newConsumable.Id = Guid.NewGuid();
            newConsumable.CreatedDate = DateTime.UtcNow;
            await AddAsync(newConsumable);
        }

        public async Task CreateRangeConsumableAsync(List<ConsumableCreateDto> createDtos)
        {
            var newConsumables = new List<Consumable>();
            foreach (var createDto in createDtos)
            {
                var newConsumable = _mapper.Map<Consumable>(createDto);
                newConsumable.Id = Guid.NewGuid();
                newConsumable.CreatedDate = DateTime.UtcNow;
                newConsumables.Add(newConsumable);
            }
            await AddRangeAsync(newConsumables);
        }

        public async Task UpdateConsumableAsync(ConsumableUpdateDto updateDto)
        {
            var consumableInDb = await GetByIdAsync(updateDto.Id);
            if (consumableInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the consumable to update is null.");
            }
            var updatedConsumable = _mapper.Map<Consumable>(updateDto);
            updatedConsumable.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(consumableInDb, updatedConsumable);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteConsumableAsync(Guid consumableId)
        {
            if (consumableId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(consumableId), $"The ID of the consumable to delete is null.");
            }
            var consumable = await GetByIdAsync(consumableId);
            if (consumable == null)
            {
                throw new ArgumentNullException(nameof(consumable), $"The consumable to delete is null.");
            }
            await RemoveAsync(consumable);
        }

        public async Task DeleteRangeConsumableAsync(List<Guid> consumableIds)
        {
            var consumables = new List<Consumable>();
            foreach (var consumableId in consumableIds)
            {
                var consumable = GetByIdAsync(consumableId).Result;
                consumables.Add(consumable);
            }
            await RemoveRangeAsync(consumables);
        }
        public async Task<ProductCounter> GetAllCountAsync()
        {
            var consumables = await GetAllAsync();
            var consumableCount = consumables.Count();
            return new ProductCounter { EntityName = "Consumables", Count = consumableCount };
        }
        public async Task<List<ProductStatusCounter>> GetStatusCount()
        {
            var consumables = new List<ProductStatusCounter>();
            return consumables;
        }
    }
}
