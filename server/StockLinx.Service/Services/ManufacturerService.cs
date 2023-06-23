using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ManufacturerService : Service<Manufacturer>, IManufacturerService
    {
        private readonly IMapper _mapper;
        public ManufacturerService(IRepository<Manufacturer> repository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task CreateManufacturerAsync(ManufacturerCreateDto createDto)
        {
            var newManufacturer = _mapper.Map<Manufacturer>(createDto);
            newManufacturer.Id = Guid.NewGuid();
            await AddAsync(newManufacturer);
        }
        public Task UpdateManufacturerAsync(ManufacturerUpdateDto updateDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteManufacturerAsync(Guid manufacturerId)
        {
            throw new NotImplementedException();
        }

    }
}
