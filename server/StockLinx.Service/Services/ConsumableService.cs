using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ConsumableService : Service<Consumable>, IConsumableService
    {
        private readonly IMapper _mapper;
        public ConsumableService(IRepository<Consumable> repository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task CreateConsumableAsync(ConsumableCreateDto createDto)
        {
            var newConsumable = _mapper.Map<Consumable>(createDto);
            newConsumable.Id = Guid.NewGuid();
            await AddAsync(newConsumable);
        }
        public Task UpdateConsumableAsync(ConsumableUpdateDto updateDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteConsumableAsync(Guid consumableId)
        {
            throw new NotImplementedException();
        }

    }
}
