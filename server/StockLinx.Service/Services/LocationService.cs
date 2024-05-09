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

        public LocationService(
            IRepository<Location> repository,
            ILocationRepository locationRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ICustomLogService customLogService
        )
            : base(repository, unitOfWork)
        {
            _locationRepository = locationRepository;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<LocationDto> GetDtoAsync(Guid id)
        {
            Location location = await GetByIdAsync(id);
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
            await _customLogService.CreateCustomLog(
                "Create",
                "Location",
                location.Id,
                location.Name
            );
            await _unitOfWork.CommitAsync();
            return _locationRepository.GetDto(location);
        }

        public async Task<List<LocationDto>> CreateRangeLocationAsync(List<LocationCreateDto> dtos)
        {
            List<Location> locations = new List<Location>();
            foreach (LocationCreateDto dto in dtos)
            {
                Location location = _mapper.Map<Location>(dto);
                location.Id = Guid.NewGuid();
                location.CreatedDate = DateTime.UtcNow;
                locations.Add(location);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "Location",
                    location.Id,
                    location.Name
                );
            }
            await _locationRepository.AddRangeAsync(locations);
            await _unitOfWork.CommitAsync();
            return _locationRepository.GetDtos(locations);
        }

        public async Task<LocationDto> UpdateLocationAsync(LocationUpdateDto dto)
        {
            Location locationInDb = await GetByIdAsync(dto.Id);
            Location location = _mapper.Map<Location>(dto);
            location.UpdatedDate = DateTime.UtcNow;
            _locationRepository.Update(locationInDb, location);
            await _customLogService.CreateCustomLog(
                "Update",
                "Location",
                location.Id,
                location.Name
            );
            await _unitOfWork.CommitAsync();
            return _locationRepository.GetDto(location);
        }

        public async Task DeleteLocationAsync(Guid id)
        {
            Location location = await GetByIdAsync(id);
            _locationRepository.Remove(location);
            await _customLogService.CreateCustomLog(
                "Delete",
                "Location",
                location.Id,
                location.Name
            );
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeLocationAsync(List<Guid> ids)
        {
            List<Location> locations = new List<Location>();
            foreach (Guid id in ids)
            {
                Location location = await GetByIdAsync(id);
                locations.Add(location);
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "Location",
                    location.Id,
                    location.Name
                );
            }
            _locationRepository.RemoveRange(locations);
            await _unitOfWork.CommitAsync();
        }
    }
}
