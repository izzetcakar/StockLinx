using AutoMapper;
using Microsoft.Extensions.Logging;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;
using StockLinx.Repository.Repositories.EF_Core;
using StockLinx.Repository.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class AccessoryService : Service<Accessory>, IAccessoryService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Accessory> _accessoryRepository;
        private readonly ILogger<AccessoryService> _logger;
        private readonly IImageService _imageService;
        public AccessoryService(IRepository<Accessory> repository,IAccessoryRepository accessoryRepository,IImageService imageService
            ,IUnitOfWork unitOfWork, IMapper mapper,ILogger<AccessoryService> logger) : base(repository, unitOfWork)
        {
            _mapper = mapper;
            _accessoryRepository = accessoryRepository;
            _imageService = imageService;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }


        public async Task CreateAccessoryAsync(AccessoryCreateDto createDto)
        {
            if (createDto == null)
            {
                throw new ArgumentNullException(nameof(createDto), "The accessory create DTO is null.");
            }

            try
            {
                var newAccessory = _mapper.Map<Accessory>(createDto);
                var accessoryId = Guid.NewGuid();
                newAccessory.Id = accessoryId;
                newAccessory.CreatedDate = DateTime.UtcNow;
                await _accessoryRepository.AddAsync(newAccessory);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating the accessory.");
                throw;
            }
        }

        public async Task UpdateAccessoryAsync(AccessoryUpdateDto updateDto)
        {
            try
            {
                var accessoryId = updateDto?.Id;
                if (accessoryId == null)
                {
                    throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the accessory to update is null.");
                }

                var accessoryInDb = await GetByIdAsync((Guid)accessoryId);
                var updatedAccessory = _mapper.Map<Accessory>(updateDto);
                updatedAccessory.UpdatedDate = DateTime.UtcNow;
                _accessoryRepository.Update(accessoryInDb, updatedAccessory);

                if (updateDto?.Image != null)
                {
                    await _imageService.AddImageAsync(updateDto.Image, (Guid)accessoryId);
                }

                await _unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the accessory.");
                throw;
            }
        }

        public async Task DeleteAccessoryAsync(Guid accessoryId)
        {
            var accessoryInDb = await GetByIdAsync(accessoryId);
            if (accessoryInDb == null)
            {
                throw new ArgumentNullException(nameof(accessoryId), "The ID of the accessory to delete is null.");
            }
        }








    }
}
