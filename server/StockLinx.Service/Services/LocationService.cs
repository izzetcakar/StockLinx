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
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public LocationService(IRepository<Location> repository, ILocationRepository locationRepository,
            IUnitOfWork unitOfWork, IMapper mapper, ICustomLogService customLogService) : base(repository, unitOfWork)
        {
            _locationRepository = locationRepository;
            _customLogService = customLogService;
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
            await _locationRepository.AddAsync(newLocation);
            await _customLogService.CreateCustomLog("Create", newLocation.Id, null, "Location", null);
            await _unitOfWork.CommitAsync();
            return _locationRepository.GetDto(newLocation);
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
                await _customLogService.CreateCustomLog("Create", newLocation.Id, null, "Location", null);
            }
            await _locationRepository.AddRangeAsync(newLocations);
            await _unitOfWork.CommitAsync();
            return _locationRepository.GetDtos(newLocations);
        }

        public async Task<LocationDto> UpdateLocationAsync(LocationUpdateDto updateDto)
        {
            var locationInDb = await GetByIdAsync(updateDto.Id);
            if (locationInDb == null)
            {
                throw new ArgumentNullException("Location is not found");
            }
            var updatedLocation = _mapper.Map<Location>(updateDto);
            updatedLocation.UpdatedDate = DateTime.UtcNow;
            _locationRepository.Update(locationInDb, updatedLocation);
            await _customLogService.CreateCustomLog("Update", updatedLocation.Id, null, "Location", null);
            await _unitOfWork.CommitAsync();
            return _locationRepository.GetDto(updatedLocation);
        }

        public async Task DeleteLocationAsync(Guid locationId)
        {
            var location = await GetByIdAsync(locationId);
            if (location == null)
            {
                throw new ArgumentNullException("Location is not found");
            }
            _locationRepository.Update(location, location);
            await _customLogService.CreateCustomLog("Delete", location.Id, null, "Location", null);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeLocationAsync(List<Guid> locationIds)
        {
            var locations = new List<Location>();
            foreach (var locationId in locationIds)
            {
                var location = await GetByIdAsync(locationId);
                if (location == null)
                {
                    throw new ArgumentNullException($"{locationId} - Location is not found");
                }
                locations.Add(location);
                await _customLogService.CreateCustomLog("Delete", location.Id, null, "Location", null);
            }
            _locationRepository.UpdateRange(locations);
            await _unitOfWork.CommitAsync();
        }
    }
}
