using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ConsumableService : Service<Consumable>, IConsumableService
    {
        private readonly IConsumableRepository _consumableRepository;
        private readonly IUserProductRepository _userProductRepository;
        private readonly IUserService _userService;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ConsumableService(
            IRepository<Consumable> repository,
            IConsumableRepository consumableRepository,
            IUserProductRepository userProductRepository,
            IUserService userService,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ICustomLogService customLogService
        )
            : base(repository, unitOfWork)
        {
            _consumableRepository = consumableRepository;
            _userProductRepository = userProductRepository;
            _userService = userService;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ConsumableDto> GetDtoAsync(Guid id)
        {
            Consumable consumable = await GetByIdAsync(id);
            return await _consumableRepository.GetDtoAsync(consumable);
        }

        public async Task<List<ConsumableDto>> GetAllDtosAsync()
        {
            return await _consumableRepository.GetAllDtosAsync();
        }

        public async Task<ConsumableDto> CreateConsumableAsync(ConsumableCreateDto dto)
        {
            await CheckTagExistAsync(dto.Tag);
            Consumable consumable = _mapper.Map<Consumable>(dto);
            await _consumableRepository.AddAsync(consumable);
            await _customLogService.CreateCustomLog(
                "Create",
                "Consumable",
                consumable.Id,
                consumable.Name
            );
            await _unitOfWork.CommitAsync();
            return await _consumableRepository.GetDtoAsync(consumable);
        }

        public async Task<List<ConsumableDto>> CreateRangeConsumableAsync(
            List<ConsumableCreateDto> createDtos
        )
        {
            await CheckTagExistAsync(createDtos.Select(dto => dto.Tag).ToList());
            List<Consumable> consumables = new List<Consumable>();
            foreach (ConsumableCreateDto createDto in createDtos)
            {
                Consumable consumable = _mapper.Map<Consumable>(createDto);
                consumables.Add(consumable);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "Consumable",
                    consumable.Id,
                    consumable.Name
                );
            }
            await _consumableRepository.AddRangeAsync(consumables);
            await _unitOfWork.CommitAsync();
            return await _consumableRepository.GetDtosAsync(consumables);
        }

        public async Task<ConsumableDto> UpdateConsumableAsync(ConsumableUpdateDto dto)
        {
            Consumable consumableInDb = await GetByIdAsync(dto.Id);
            Consumable consumable = _mapper.Map<Consumable>(dto);
            consumable.UpdatedDate = DateTime.UtcNow;
            _consumableRepository.Update(consumableInDb, consumable);
            await _customLogService.CreateCustomLog(
                "Update",
                "Consumable",
                consumable.Id,
                consumable.Name
            );
            await _unitOfWork.CommitAsync();
            return await _consumableRepository.GetDtoAsync(consumable);
        }

        public async Task DeleteConsumableAsync(Guid id)
        {
            Consumable consumable = await GetByIdAsync(id);
            bool canDelete = await _consumableRepository.CanDeleteAsync(id);
            if (canDelete)
            {
                _consumableRepository.Remove(consumable);
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "Consumable",
                    consumable.Id,
                    consumable.Name
                );
                await _unitOfWork.CommitAsync();
            }
        }

        public async Task DeleteRangeConsumableAsync(List<Guid> ids)
        {
            List<Consumable> consumables = new List<Consumable>();
            foreach (Guid id in ids)
            {
                Consumable consumable = await GetByIdAsync(id);
                bool canDelete = await _consumableRepository.CanDeleteAsync(id);
                if (canDelete)
                {
                    consumables.Add(consumable);
                    await _customLogService.CreateCustomLog(
                        "Delete",
                        "Consumable",
                        consumable.Id,
                        consumable.Name
                    );
                }
            }
            _consumableRepository.RemoveRange(consumables);
            await _unitOfWork.CommitAsync();
        }

        public async Task<UserProduct> CheckInAsync(UserProductCheckInDto checkInDto)
        {
            User user = await _userService.GetByIdAsync(checkInDto.UserId);
            Consumable consumable = await GetByIdAsync(checkInDto.ProductId);
            int availableQuantity = await _consumableRepository.GetAvaliableQuantityAsync(
                consumable
            );
            if (availableQuantity - checkInDto.Quantity < 0)
            {
                throw new Exception("Consumable stock is not enough");
            }
            UserProduct userProduct = new UserProduct
            {
                Id = Guid.NewGuid(),
                ConsumableId = consumable.Id,
                UserId = checkInDto.UserId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Quantity = checkInDto.Quantity,
                Notes = checkInDto.Notes,
            };
            await _userProductRepository.AddAsync(userProduct);
            await _customLogService.CreateCustomLog(
                "CheckIn",
                "Consumable",
                consumable.Id,
                consumable.Name,
                "User",
                user.Id,
                user.FirstName + user.LastName,
                "Checked In " + checkInDto.Quantity + " units"
            );
            await _unitOfWork.CommitAsync();
            return userProduct;
        }

        public async Task CheckOutAsync(UserProductCheckOutDto checkOutDto)
        {
            UserProduct userProduct = await _userProductRepository.GetByIdAsync(
                checkOutDto.UserProductId
            );
            Consumable consumable = await GetByIdAsync(checkOutDto.ProductId);
            switch (checkOutDto.Quantity - userProduct.Quantity)
            {
                case 0:
                    _userProductRepository.Remove(userProduct);
                    await _customLogService.CreateCustomLog(
                        "CheckOut",
                        "Consumable",
                        consumable.Id,
                        consumable.Name,
                        checkOutDto.Notes ?? "Checked Out " + checkOutDto.Quantity + " units"
                    );
                    break;
                case > 0:
                    throw new Exception(
                        "Quantity must be less than or equal to the quantity in stock"
                    );
                default:
                    UserProduct newUserProduct = userProduct;
                    newUserProduct.Quantity -= checkOutDto.Quantity;
                    _userProductRepository.Update(userProduct, newUserProduct);
                    await _customLogService.CreateCustomLog(
                        "CheckOut",
                        "Consumable",
                        consumable.Id,
                        consumable.Name,
                        checkOutDto.Notes ?? "Checked Out " + checkOutDto.Quantity + " units"
                    );
                    break;
            }
            await _unitOfWork.CommitAsync();
        }
        public async Task CheckTagExistAsync(string tag)
        {
            tag = TagUtils.Check(tag);
            bool isExist = await AnyAsync(d => d.Tag == tag);
            if (isExist)
            {
                throw new Exception($"Tag {tag} already exist.");
            }
        }

        public async Task CheckTagExistAsync(List<string> tags)
        {
            tags = TagUtils.Check(tags);
            var existingTags = await Where(d => tags.Contains(d.Tag));
            if (existingTags.Count() > 0)
            {
                var existingTagNames = existingTags.Select(x => x.Tag).ToList();
                throw new Exception($"Tags {string.Join("\n", existingTagNames)} already exist.");
            }
        }

        public async Task<List<ConsumableDto>> FilterAllAsync(string filter)
        {
            var result = await FilterAsync(filter);
            return await _consumableRepository.GetDtosAsync(result.ToList());
        }
    }
}
