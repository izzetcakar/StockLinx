using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Others;
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
        private readonly ICompanyRepository _companyRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public LocationService(IRepository<Location> repository, ILocationRepository locationRepository, ICompanyRepository companyRepository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _locationRepository = locationRepository;
            _companyRepository = companyRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task CreateLocationAsync(LocationCreateDto createDto)
        {
            var newLocation = _mapper.Map<Location>(createDto);
            newLocation.Id = Guid.NewGuid();
            newLocation.CreatedDate = DateTime.UtcNow;
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

        public async Task<List<ProductLocationCounterDto>> GetAllCounts()
        {
            var list = new List<ProductLocationCounterDto>();
            //var locations = await _locationRepository.GetAll().ToListAsync();
            //var companies = await _companyRepository.GetAll()
            //    .Include(x => x.Accessories)
            //    .Include(x => x.Assets)
            //    .Include(x => x.Components)
            //    .Include(x => x.Consumables)
            //    .Include(x => x.Licenses)
            //    .Include(x => x.Location)
            //    .Where(x => x.LocationId != null).ToListAsync();
            //foreach (var company in companies)
            //{
            //    var location = locations.FirstOrDefault(x => x.Id == company.LocationId);
            //    if (location != null)
            //    {
            //        list.Add(
            //            new ProductLocationCounterDto
            //            {
            //                LocationId = location.Id,
            //                LocationName = location.Name,
            //                ProductCount = company.Accessories.Count + company.Assets.Count + company.Components.Count + company.Consumables.Count + company.Licenses.Count,
            //                AssignedCount = company.Accessories.Count(p => p.ProductStatus.Type == ProductStatusType.DEPLOYED)
            //            }
            //            );
            //    }
            //}
            return list;
        }

    }
}
