using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class AssetService : Service<Asset>, IAssetService
    {
        private readonly IMapper _mapper;
        public AssetService(IRepository<Asset> repository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task CreateAssetAsync(AssetCreateDto createDto)
        {
            var newAsset = _mapper.Map<Asset>(createDto);
            newAsset.Id = Guid.NewGuid();
            await AddAsync(newAsset);
        }
        public Task UpdateAssetAsync(AssetUpdateDto updateDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAssetAsync(Guid assetId)
        {
            throw new NotImplementedException();
        }

    }
}
