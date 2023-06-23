using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class LocationService : Service<Location>, ILocationService
    {
        private readonly IMapper _mapper;
        public LocationService(IRepository<Location> repository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task CreateLocationAsync(LocationCreateDto createDto)
        {
            var newLocation = _mapper.Map<Location>(createDto);
            newLocation.Id = Guid.NewGuid();
            await AddAsync(newLocation);
        }
        public Task UpdateLocationAsync(LocationUpdateDto updateDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteLocationAsync(Guid locationId)
        {
            throw new NotImplementedException();
        }

    }
}
