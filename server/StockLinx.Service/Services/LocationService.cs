using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;
using StockLinx.Repository.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class LocationService : Service<Location>, ILocationService
    {
        private readonly ILocationRepository _locationRepository
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public LocationService(IRepository<Location> repository, ILocationRepository locationRepository,IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _locationRepository = locationRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task CreateLocationAsync(LocationCreateDto createDto)
        {
            var newLocation = _mapper.Map<Location>(createDto);
            newLocation.Id = Guid.NewGuid();
            newLocation.CreatedDate = DateTime.UtcNow;

            //Check if newLocation.ImagePath is base64 or not and not null
            if (newLocation.ImagePath != null && newLocation.ImagePath.Contains("data:image/png;base64,"))
            {
                string base64 = newLocation.ImagePath.Substring(newLocation.ImagePath.IndexOf(',') + 1);
                string path = newLocation.Name + DateTime.Now.ToString("yyyyMMddHHmmss");
                ImageHandler.UploadBase64AsFile(base64, path);
            }
            await AddAsync(newLocation);
        }
        public async Task UpdateLocationAsync(LocationUpdateDto updateDto)
        {
            var locationInDb = await GetByIdAsync(updateDto.Id);
            if (locationInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the Location to update is null.");
            }
            var updatedLocation = _mapper.Map<Location>(updateDto);
            updatedLocation.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(locationInDb, updatedLocation);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteLocationAsync(Guid locationId)
        {
            if (locationId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(locationId), "The ID of the Location to delete is null.");
            }
            var Location = await GetByIdAsync(locationId);
            if (Location == null)
            {
                throw new ArgumentNullException(nameof(Location), "The Location to delete is null.");
            }
            await RemoveAsync(Location);
        }
    }
}
