using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;
using StockLinx.Repository.Repositories.EF_Core;

namespace StockLinx.Service.Services
{
    public class ManufacturerService : Service<Manufacturer>, IManufacturerService
    {
        private readonly IManufacturerRepository _manufacturerRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IFilterService<Manufacturer> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ManufacturerService(
            IRepository<Manufacturer> repository,
            IManufacturerRepository manufacturerRepository,
            ICustomLogService customLogService,
            IFilterService<Manufacturer> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _manufacturerRepository = manufacturerRepository;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ManufacturerDto> GetDtoAsync(Guid id)
        {
            Manufacturer manufacturer = await GetByIdAsync(id);
            return _manufacturerRepository.GetDto(manufacturer);
        }

        public async Task<List<ManufacturerDto>> GetAllDtosAsync()
        {
            return await _manufacturerRepository.GetAllDtosAsync();
        }

        public async Task<ManufacturerDto> CreateManufacturerAsync(ManufacturerCreateDto dto)
        {
            Manufacturer manufacturer = _mapper.Map<Manufacturer>(dto);

            if (manufacturer.ImagePath != null)
            {
                if (manufacturer.ImagePath.Contains("base64,"))
                {
                    ImageUtils.UploadBase64AsJpg(
                        manufacturer.ImagePath,
                        $"{manufacturer.Id}",
                        "Manufacturers"
                    );
                    manufacturer.ImagePath = $"Manufacturers/{manufacturer.Id}.jpg";
                }
            }

            await _manufacturerRepository.AddAsync(manufacturer);
            await _customLogService.CreateCustomLog(
                "Create",
                "Manufacturer",
                manufacturer.Id,
                manufacturer.Name
            );
            await _unitOfWork.CommitAsync();
            return _manufacturerRepository.GetDto(manufacturer);
        }

        public async Task<List<ManufacturerDto>> CreateRangeManufacturerAsync(
            List<ManufacturerCreateDto> dtos
        )
        {
            List<Manufacturer> manufacturers = new List<Manufacturer>();
            foreach (ManufacturerCreateDto dto in dtos)
            {
                Manufacturer manufacturer = _mapper.Map<Manufacturer>(dto);
                manufacturers.Add(manufacturer);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "Manufacturer",
                    manufacturer.Id,
                    manufacturer.Name
                );
            }
            await _manufacturerRepository.AddRangeAsync(manufacturers);
            await _unitOfWork.CommitAsync();
            return _manufacturerRepository.GetDtos(manufacturers);
        }

        public async Task<ManufacturerDto> UpdateManufacturerAsync(ManufacturerUpdateDto dto)
        {
            Manufacturer manufacturerInDb = await GetByIdAsync(dto.Id);
            Manufacturer manufacturer = _mapper.Map<Manufacturer>(dto);
            manufacturer.UpdatedDate = DateTime.UtcNow;

            if (manufacturer.ImagePath != null)
            {
                if (manufacturer.ImagePath.Contains("base64,"))
                {
                    ImageUtils.UploadBase64AsJpg(
                        manufacturer.ImagePath,
                        $"{manufacturer.Id}",
                        "Manufacturers"
                    );
                    manufacturer.ImagePath = $"Manufacturers/{manufacturer.Id}.jpg";
                }
            }

            _manufacturerRepository.Update(manufacturerInDb, manufacturer);
            await _customLogService.CreateCustomLog(
                "Update",
                "Manufacturer",
                manufacturer.Id,
                manufacturer.Name
            );
            await _unitOfWork.CommitAsync();
            return _manufacturerRepository.GetDto(manufacturer);
        }

        public async Task DeleteManufacturerAsync(Guid id)
        {
            Manufacturer manufacturer = await GetByIdAsync(id);
            _manufacturerRepository.Remove(manufacturer);
            await _customLogService.CreateCustomLog(
                "Delete",
                "Manufacturer",
                manufacturer.Id,
                manufacturer.Name
            );
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeManufacturerAsync(List<Guid> ids)
        {
            List<Manufacturer> manufacturers = new List<Manufacturer>();
            foreach (Guid id in ids)
            {
                Manufacturer manufacturer = await GetByIdAsync(id);
                manufacturers.Add(manufacturer);
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "Manufacturer",
                    manufacturer.Id,
                    manufacturer.Name
                );
            }
            _manufacturerRepository.RemoveRange(manufacturers);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<ManufacturerDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return _manufacturerRepository.GetDtos(result.ToList());
        }
    }
}
