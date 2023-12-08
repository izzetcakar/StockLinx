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
    public class LocationService : Service<Location>, ILocationService
    {
        private readonly ILocationRepository _locationRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public LocationService(IRepository<Location> repository, ILocationRepository locationRepository,
            IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _locationRepository = locationRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<LocationDto> GetDto(Guid id)
        {
            var location = await GetByIdAsync(id);
            return _locationRepository.GetDto(location);
        }

        public async Task<List<LocationDto>> GetAllDtos()
        {
            return await _locationRepository.GetAllDtos();
        }

        public async Task<LocationDto> CreateLocationAsync(LocationCreateDto createDto)
        {
            var newLocation = _mapper.Map<Location>(createDto);
            newLocation.Id = Guid.NewGuid();
            newLocation.CreatedDate = DateTime.UtcNow;
            var added = await AddAsync(newLocation);
            return _locationRepository.GetDto(added);
        }

        public async Task<List<LocationDto>> CreateRangeLocationAsync(List<LocationCreateDto> createDtos)
        {
            var newLocations = new List<Location>();
            foreach (var createDto in createDtos)
            {
                var newLocation = _mapper.Map<Location>(createDto);
                newLocation.Id = Guid.NewGuid();
                newLocation.CreatedDate = DateTime.UtcNow;
                newLocations.Add(newLocation);
            }
            var added = await AddRangeAsync(newLocations);
            return _locationRepository.GetDtos(added.ToList());
        }

        public async Task<LocationDto> UpdateLocationAsync(LocationUpdateDto updateDto)
        {
            var locationInDb = await GetByIdAsync(updateDto.Id);
            if (locationInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the location to update is null.");
            }
            var updatedLocation = _mapper.Map<Location>(updateDto);
            updatedLocation.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(locationInDb, updatedLocation);
            var location = await GetByIdAsync(updateDto.Id);
            return _locationRepository.GetDto(location);
        }

        public async Task DeleteLocationAsync(Guid locationId)
        {
            if (locationId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(locationId), $"The ID of the location to delete is null.");
            }
            var location = await GetByIdAsync(locationId);
            if (location == null)
            {
                throw new ArgumentNullException(nameof(location), $"The location to delete is null.");
            }
            await RemoveAsync(location);
        }

        public async Task DeleteRangeLocationAsync(List<Guid> locationIds)
        {
            var locations = new List<Location>();
            foreach (var locationId in locationIds)
            {
                var location = GetByIdAsync(locationId).Result;
                locations.Add(location);
            }
            await RemoveRangeAsync(locations);
        }
    }
}
