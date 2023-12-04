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
    public class ManufacturerService : Service<Manufacturer>, IManufacturerService
    {
        private readonly IManufacturerRepository _manufacturerRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ManufacturerService(IRepository<Manufacturer> repository, IManufacturerRepository manufacturerRepository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _manufacturerRepository = manufacturerRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ManufacturerDto> GetDto(Guid id)
        {
            var manufacturer = await GetByIdAsync(id);
            return _manufacturerRepository.GetDto(manufacturer);
        }

        public async Task<List<ManufacturerDto>> GetAllDtos()
        {
            return await _manufacturerRepository.GetAllDtos();
        }
        public async Task<ManufacturerDto> CreateManufacturerAsync(ManufacturerCreateDto createDto)
        {
            var newManufacturer = _mapper.Map<Manufacturer>(createDto);
            newManufacturer.Id = Guid.NewGuid();
            newManufacturer.CreatedDate = DateTime.UtcNow;
            var added = await AddAsync(newManufacturer);
            return _manufacturerRepository.GetDto(added);
        }

        public async Task<List<ManufacturerDto>> CreateRangeManufacturerAsync(List<ManufacturerCreateDto> createDtos)
        {
            var newManufacturers = new List<Manufacturer>();
            foreach (var createDto in createDtos)
            {
                var newManufacturer = _mapper.Map<Manufacturer>(createDto);
                newManufacturer.Id = Guid.NewGuid();
                newManufacturer.CreatedDate = DateTime.UtcNow;
                newManufacturers.Add(newManufacturer);
            }
            var added = await AddRangeAsync(newManufacturers);
            return _manufacturerRepository.GetDtos(added.ToList());
        }

        public async Task UpdateManufacturerAsync(ManufacturerUpdateDto updateDto)
        {
            var manufacturerInDb = await GetByIdAsync(updateDto.Id);
            if (manufacturerInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the manufacturer to update is null.");
            }
            var updatedManufacturer = _mapper.Map<Manufacturer>(updateDto);
            updatedManufacturer.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(manufacturerInDb, updatedManufacturer);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteManufacturerAsync(Guid manufacturerId)
        {
            if (manufacturerId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(manufacturerId), $"The ID of the manufacturer to delete is null.");
            }
            var manufacturer = await GetByIdAsync(manufacturerId);
            if (manufacturer == null)
            {
                throw new ArgumentNullException(nameof(manufacturer), $"The manufacturer to delete is null.");
            }
            await RemoveAsync(manufacturer);
        }

        public async Task DeleteRangeManufacturerAsync(List<Guid> manufacturerIds)
        {
            var manufacturers = new List<Manufacturer>();
            foreach (var manufacturerId in manufacturerIds)
            {
                var manufacturer = GetByIdAsync(manufacturerId).Result;
                manufacturers.Add(manufacturer);
            }
            await RemoveRangeAsync(manufacturers);
        }
    }
}
