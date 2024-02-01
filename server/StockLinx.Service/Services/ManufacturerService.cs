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
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ManufacturerService(IRepository<Manufacturer> repository, IManufacturerRepository manufacturerRepository,
            IUnitOfWork unitOfWork, IMapper mapper, ICustomLogService customLogService) : base(repository, unitOfWork)
        {
            _manufacturerRepository = manufacturerRepository;
            _customLogService = customLogService;
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

            if (newManufacturer.ImagePath != null)
            {
                if (newManufacturer.ImagePath.Contains("base64,"))
                {
                    ImageHandler.UploadBase64AsJpg(newManufacturer.ImagePath, $"{newManufacturer.Id}", "Manufacturers");
                    newManufacturer.ImagePath = $"Manufacturers/{newManufacturer.Id}.jpg";
                }
            }

            await _manufacturerRepository.AddAsync(newManufacturer);
            await _customLogService.CreateCustomLog("Create", newManufacturer.Id, null, "Manufacturer", null);
            await _unitOfWork.CommitAsync();
            return _manufacturerRepository.GetDto(newManufacturer);
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
                await _customLogService.CreateCustomLog("Create", newManufacturer.Id, null, "Manufacturer", null);
            }
            await _manufacturerRepository.AddRangeAsync(newManufacturers);
            await _unitOfWork.CommitAsync();
            return _manufacturerRepository.GetDtos(newManufacturers);
        }

        public async Task<ManufacturerDto> UpdateManufacturerAsync(ManufacturerUpdateDto updateDto)
        {
            var manufacturerInDb = await GetByIdAsync(updateDto.Id);
            if (manufacturerInDb == null)
            {
                throw new ArgumentNullException("Manufacturer is not found");
            }
            var updatedManufacturer = _mapper.Map<Manufacturer>(updateDto);
            updatedManufacturer.UpdatedDate = DateTime.UtcNow;

            if (updatedManufacturer.ImagePath != null)
            {
                if (updatedManufacturer.ImagePath.Contains("base64,"))
                {
                    ImageHandler.UploadBase64AsJpg(updatedManufacturer.ImagePath, $"{updatedManufacturer.Id}", "Manufacturers");
                    updatedManufacturer.ImagePath = $"Manufacturers/{updatedManufacturer.Id}.jpg";
                }
            }

            _manufacturerRepository.Update(manufacturerInDb, updatedManufacturer);
            await _customLogService.CreateCustomLog("Update", updatedManufacturer.Id, null, "Manufacturer", null);
            await _unitOfWork.CommitAsync();
            return _manufacturerRepository.GetDto(updatedManufacturer);
        }

        public async Task DeleteManufacturerAsync(Guid manufacturerId)
        {
            var manufacturer = await GetByIdAsync(manufacturerId);
            if (manufacturer == null)
            {
                throw new ArgumentNullException("Manufacturer is not found");
            }
            manufacturer.DeletedDate = DateTime.UtcNow;
            _manufacturerRepository.Update(manufacturer, manufacturer);
            await _customLogService.CreateCustomLog("Delete", manufacturer.Id, null, "Manufacturer", null);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeManufacturerAsync(List<Guid> manufacturerIds)
        {
            var manufacturers = new List<Manufacturer>();
            foreach (var manufacturerId in manufacturerIds)
            {
                var manufacturer = await GetByIdAsync(manufacturerId);
                if (manufacturer == null)
                {
                    throw new ArgumentNullException($"{manufacturerId} - Manufacturer is not found");
                }
                manufacturer.DeletedDate = DateTime.UtcNow;
                manufacturers.Add(manufacturer);
                await _customLogService.CreateCustomLog("Delete", manufacturer.Id, null, "Manufacturer", null);
            }
            _manufacturerRepository.UpdateRange(manufacturers);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<ManufacturerDto>> GetManufacturersPagedAsync(int skip, int take, Dictionary<string, string> filters)
        {
            var dtos = new List<ManufacturerDto>();
            dtos = await _manufacturerRepository.GetManufacturersPagedAsync(skip, take, filters);
            return dtos;
        }
    }
}
