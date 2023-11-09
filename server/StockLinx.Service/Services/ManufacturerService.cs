using AutoMapper;
using Microsoft.EntityFrameworkCore;
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

        public async Task<List<ManufacturerDto>> GetManufacturerDtos()
        {
            var manufacturers = await _manufacturerRepository.GetAll().ToListAsync();
            var manufacturerDtos = _mapper.Map<List<ManufacturerDto>>(manufacturers);
            return manufacturerDtos;
        }
        public async Task CreateManufacturerAsync(ManufacturerCreateDto createDto)
        {
            var newManufacturer = _mapper.Map<Manufacturer>(createDto);
            newManufacturer.Id = Guid.NewGuid();
            newManufacturer.CreatedDate = DateTime.UtcNow;

            //Check if newManufacturer.ImagePath is base64 or not and not null
            if (newManufacturer.ImagePath != null && newManufacturer.ImagePath.Contains("data:image/png;base64,"))
            {
                string base64 = newManufacturer.ImagePath.Substring(newManufacturer.ImagePath.IndexOf(',') + 1);
                string path = newManufacturer.Name + DateTime.Now.ToString("yyyyMMddHHmmss");
                ImageHandler.UploadBase64AsFile(base64, path);
            }
            await AddAsync(newManufacturer);
        }
        public async Task UpdateManufacturerAsync(ManufacturerUpdateDto updateDto)
        {
            var manufacturerInDb = await GetByIdAsync(updateDto.Id);
            if (manufacturerInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the Manufacturer to update is null.");
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
                throw new ArgumentNullException(nameof(manufacturerId), "The ID of the Manufacturer to delete is null.");
            }
            var Manufacturer = await GetByIdAsync(manufacturerId);
            if (Manufacturer == null)
            {
                throw new ArgumentNullException(nameof(Manufacturer), "The Manufacturer to delete is null.");
            }
            await RemoveAsync(Manufacturer);
        }
    }
}
