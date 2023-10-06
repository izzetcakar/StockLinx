using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;
using StockLinx.Repository.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ConsumableService : Service<Consumable>, IConsumableService
    {
        private readonly IConsumableRepository _consumableRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ConsumableService(IRepository<Consumable> repository,IConsumableRepository consumableRepository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _consumableRepository = consumableRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task CreateConsumableAsync(ConsumableCreateDto createDto)
        {
            var newConsumable = _mapper.Map<Consumable>(createDto);
            newConsumable.Id = Guid.NewGuid();
            newConsumable.CreatedDate = DateTime.UtcNow;

            //Check if newConsumable.ImagePath is base64 or not and not null
            if (newConsumable.ImagePath != null && newConsumable.ImagePath.Contains("data:image/png;base64,"))
            {
                string base64 = newConsumable.ImagePath.Substring(newConsumable.ImagePath.IndexOf(',') + 1);
                string path = newConsumable.Name + DateTime.Now.ToString("yyyyMMddHHmmss");
                ImageHandler.UploadBase64AsFile(base64, path);
            }
            await AddAsync(newConsumable);
        }
        public async Task UpdateConsumableAsync(ConsumableUpdateDto updateDto)
        {
            var consumableInDb = await GetByIdAsync(updateDto.Id);
            if (consumableInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the Consumable to update is null.");
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
                throw new ArgumentNullException(nameof(consumableId), "The ID of the Consumable to delete is null.");
            }
            var Consumable = await GetByIdAsync(consumableId);
            if (Consumable == null)
            {
                throw new ArgumentNullException(nameof(Consumable), "The Consumable to delete is null.");
            }
            await RemoveAsync(Consumable);
        }
        public async Task<ProductCounter> GetAllCountAsync()
        {
            var consumables = await GetAllAsync();
            var consumableCount = consumables.Count();
            return new ProductCounter { EntityName = "Consumables", Count = consumableCount };
        }

        public async Task<List<ProductStatusCounter>> GetStatusCount()
        {
            var consumables = await GetAllAsync();
            var productStatusGroups = consumables.GroupBy(a => a.ProductStatus);
            var productStatusCounts = new List<ProductStatusCounter>();
            foreach (var group in productStatusGroups)
            {
                var productStatus = group.Key.ToString();
                productStatusCounts.Add(new ProductStatusCounter
                {
                    Status = group.Key.ToString(),
                    Count = group.Count()
                });
            }
            return productStatusCounts.ToList();
        }
    }
}
