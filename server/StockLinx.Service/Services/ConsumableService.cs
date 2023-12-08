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
            var consumable = await GetByIdAsync(updateDto.Id);
            await _consumableRepository.GetDto(consumable);
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
    }
}
