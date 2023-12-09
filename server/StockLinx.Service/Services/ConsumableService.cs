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
    public class ConsumableService : Service<Consumable>, IConsumableService
    {
        private readonly IConsumableRepository _consumableRepository;
        private readonly IDeployedProductRepository _deployedProductRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ConsumableService(IRepository<Consumable> repository, IConsumableRepository consumableRepository,
            IUnitOfWork unitOfWork, IMapper mapper, IDeployedProductRepository deployedProductRepository) : base(repository, unitOfWork)
        {
            _consumableRepository = consumableRepository;
            _deployedProductRepository = deployedProductRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ConsumableDto> GetDto(Guid id)
        {
            var consumable = await GetByIdAsync(id);
            return await _consumableRepository.GetDto(consumable);
        }

        public async Task<List<ConsumableDto>> GetAllDtos()
        {
            return await _consumableRepository.GetAllDtos();
        }

        public async Task<ConsumableDto> CreateConsumableAsync(ConsumableCreateDto createDto)
        {
            var newConsumable = _mapper.Map<Consumable>(createDto);
            newConsumable.Id = Guid.NewGuid();
            newConsumable.CreatedDate = DateTime.UtcNow;
            var addedConsumable = await AddAsync(newConsumable);
            return await _consumableRepository.GetDto(addedConsumable);
        }

        public async Task<List<ConsumableDto>> CreateRangeConsumableAsync(List<ConsumableCreateDto> createDtos)
        {
            var newConsumables = new List<Consumable>();
            foreach (var createDto in createDtos)
            {
                var newConsumable = _mapper.Map<Consumable>(createDto);
                newConsumable.Id = Guid.NewGuid();
                newConsumable.CreatedDate = DateTime.UtcNow;
                newConsumables.Add(newConsumable);
            }
            var addedConsumables = await AddRangeAsync(newConsumables);
            return await _consumableRepository.GetDtos(addedConsumables.ToList());
        }

        public async Task<ConsumableDto> UpdateConsumableAsync(ConsumableUpdateDto updateDto)
        {
            var consumableInDb = await GetByIdAsync(updateDto.Id);
            if (consumableInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the consumable to update is null.");
            }
            var updatedConsumable = _mapper.Map<Consumable>(updateDto);
            updatedConsumable.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(consumableInDb, updatedConsumable);
            var consumable = await GetByIdAsync(updateDto.Id);
            return await _consumableRepository.GetDto(consumable);
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

        public async Task<ConsumableCheckInResponseDto> CheckIn(ConsumableCheckInDto checkInDto)
        {
            try
            {
                var consumable = await _consumableRepository.GetByIdAsync(checkInDto.ConsumableId);
                if (consumable == null)
                {
                    throw new Exception("Consumable is not found");
                }
                var deployedProducts = await _deployedProductRepository.GetAll().ToListAsync();
                var availableQuantity = consumable.Quantity - deployedProducts.Count(d => d.ConsumableId.HasValue && d.ConsumableId == consumable.Id);
                if (availableQuantity < 1)
                {
                    throw new Exception("Consumable is out of stock");
                }
                var deployedProduct = new DeployedProduct
                {
                    Id = Guid.NewGuid(),
                    ConsumableId = checkInDto.ConsumableId,
                    UserId = checkInDto.UserId,
                    AssignDate = DateTime.UtcNow,
                    CreatedDate = DateTime.UtcNow,
                    Notes = checkInDto.Notes,
                };
                await _deployedProductRepository.AddAsync(deployedProduct);
                var consumableDto = await _consumableRepository.GetDto(consumable);
                var deployedProductDto = _deployedProductRepository.GetDto(deployedProduct);
                await _unitOfWork.CommitAsync();
                return new ConsumableCheckInResponseDto
                {
                    Consumable = consumableDto,
                    DeployedProduct = deployedProductDto
                };
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<ConsumableDto> CheckOut(Guid id)
        {
            try
            {
                var deployedProduct = await _deployedProductRepository.Where(d => d.ConsumableId.HasValue && d.Id == id).SingleOrDefaultAsync();
                if (deployedProduct == null)
                {
                    throw new Exception("Deployed product is not found");
                }
                var consumable = await _consumableRepository.GetByIdAsync(deployedProduct.ConsumableId);
                if (consumable == null)
                {
                    throw new Exception("Consumable is not found");
                }
                _deployedProductRepository.Remove(deployedProduct);
                var consumableDto = await _consumableRepository.GetDto(consumable);
                await _unitOfWork.CommitAsync();
                return consumableDto;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
