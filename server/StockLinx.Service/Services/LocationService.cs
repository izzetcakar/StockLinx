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

        public async Task<LocationDto> GetDtoAsync(Guid id)
        {
            var location = await GetByIdAsync(id);
            return _locationRepository.GetDto(location);
        }

        public async Task<List<LocationDto>> GetAllDtosAsync()
        {
            return await _locationRepository.GetAllDtosAsync();
        }

        public async Task<LocationDto> CreateLocationAsync(LocationCreateDto dto)
        {
            Location location = _mapper.Map<Location>(dto);
            location.Id = Guid.NewGuid();
            location.CreatedDate = DateTime.UtcNow;
            await _locationRepository.AddAsync(location);
            await _customLogService.CreateCustomLog("Create", "Location", location.Name);
            await _unitOfWork.CommitAsync();
            return _locationRepository.GetDto(location);
        }

        public async Task<List<LocationDto>> CreateRangeLocationAsync(List<LocationCreateDto> dtos)
        {
            List<Location> locations = new List<Location>();
            foreach (var dto in dtos)
            {
                Location location = _mapper.Map<Location>(dto);
                location.Id = Guid.NewGuid();
                location.CreatedDate = DateTime.UtcNow;
                locations.Add(location);
                await _customLogService.CreateCustomLog("Create", "Location", location.Name);
            }
            await _locationRepository.AddRangeAsync(locations);
            await _unitOfWork.CommitAsync();
            return _locationRepository.GetDtos(locations);
        }

        public async Task<LocationDto> UpdateLocationAsync(LocationUpdateDto dto)
        {
            var locationInDb = await GetByIdAsync(dto.Id);
            if (locationInDb == null)
            {
                throw new ArgumentNullException("Location is not found");
            }
            Location location = _mapper.Map<Location>(dto);
            location.UpdatedDate = DateTime.UtcNow;
            _locationRepository.Update(locationInDb, location);
            await _customLogService.CreateCustomLog("Update", "Location", location.Name);
            await _unitOfWork.CommitAsync();
            return _locationRepository.GetDto(location);
        }

        public async Task DeleteLocationAsync(Guid id)
        {
            var location = await GetByIdAsync(id);
            if (location == null)
            {
                throw new ArgumentNullException("Location is not found");
            }
            _locationRepository.Remove(location);
            await _customLogService.CreateCustomLog("Delete", "Location", location.Name);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeLocationAsync(List<Guid> ids)
        {
            var locations = new List<Location>();
            foreach (var id in ids)
            {
                var location = await GetByIdAsync(id);
                if (location == null)
                {
                    throw new ArgumentNullException("Location is not found");
                }
                locations.Add(location);
                await _customLogService.CreateCustomLog("Delete", "Location", location.Name);
            }
            _locationRepository.RemoveRange(locations);
            await _unitOfWork.CommitAsync();
        }
    }
}
