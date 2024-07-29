using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
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
        private readonly IEmployeeProductRepository _employeeProductRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IPermissionService _permissionService;
        private readonly IFilterService<Consumable> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ConsumableService(
            IRepository<Consumable> repository,
            IConsumableRepository consumableRepository,
            IEmployeeRepository employeeRepository,
            ICompanyRepository companyRepository,
            IEmployeeProductRepository employeeProductRepository,
            ICustomLogService customLogService,
            IPermissionService permissionService,
            IFilterService<Consumable> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _consumableRepository = consumableRepository;
            _employeeRepository = employeeRepository;
            _employeeProductRepository = employeeProductRepository;
            _companyRepository = companyRepository;
            _customLogService = customLogService;
            _permissionService = permissionService;
            _filterService = filterService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ConsumableDto> GetDtoAsync(Guid id)
        {
            Consumable consumable = await GetByIdAsync(id);
            await _permissionService.VerifyCompanyAccessAsync(consumable.CompanyId);
            return await _consumableRepository.GetDtoAsync(consumable);
        }

        public async Task<List<ConsumableDto>> GetAllDtosAsync()
        {
            List<Guid> companyIds = await _permissionService.GetCompanyIdsAsync();
            return await _consumableRepository.GetAllDtosAsync(companyIds);
        }

        public async Task<ConsumableDto> CreateConsumableAsync(ConsumableCreateDto dto)
        {
            await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
            await CheckTagExistAsync(dto.Tag);
            Consumable newConsumable = _mapper.Map<Consumable>(dto);
            await _consumableRepository.AddAsync(newConsumable);
            await CreateCheckLogAsync(
                "Create",
                newConsumable,
                await _companyRepository.GetByIdAsync(newConsumable.CompanyId)
            );
            await _unitOfWork.CommitAsync();
            return await _consumableRepository.GetDtoAsync(newConsumable);
        }

        public async Task<List<ConsumableDto>> CreateRangeConsumableAsync(
            List<ConsumableCreateDto> dtos
        )
        {
            await CheckTagExistAsync(dtos.Select(dto => dto.Tag).ToList());
            List<Consumable> newAccessories = new List<Consumable>();
            foreach (ConsumableCreateDto dto in dtos)
            {
                await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
                Consumable newConsumable = _mapper.Map<Consumable>(dto);
                newConsumable.Quantity = 1;
                newAccessories.Add(newConsumable);
                await CreateCheckLogAsync(
                    "Create",
                    newConsumable,
                    await _companyRepository.GetByIdAsync(newConsumable.CompanyId)
                );
            }
            await _consumableRepository.AddRangeAsync(newAccessories);
            await _unitOfWork.CommitAsync();
            return await _consumableRepository.GetDtosAsync(newAccessories);
        }

        public async Task<ConsumableDto> UpdateConsumableAsync(ConsumableUpdateDto dto)
        {
            await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
            Consumable consumableInDb = await GetByIdAsync(dto.Id);
            Consumable consumable = _mapper.Map<Consumable>(dto);
            consumable.UpdatedDate = DateTime.UtcNow;

            int availableQuantity = await _consumableRepository.GetAvaliableQuantityAsync(
                consumable
            );
            if (consumable.Quantity < availableQuantity)
            {
                throw new Exception(
                    "Quantity must be greater than or equal to the available quantity"
                );
            }

            _consumableRepository.Update(consumableInDb, consumable);
            await CreateCheckLogAsync("Update", consumable);
            await _unitOfWork.CommitAsync();
            return await _consumableRepository.GetDtoAsync(consumable);
        }

        public async Task DeleteConsumableAsync(Guid id)
        {
            Consumable consumable = await GetByIdAsync(id);
            await _permissionService.VerifyCompanyAccessAsync(consumable.CompanyId);
            await _consumableRepository.CanDeleteAsync(id);
            await _customLogService.CreateCustomLog(
                "Delete",
                "Consumable",
                consumable.Id,
                consumable.Name
            );
            _consumableRepository.Remove(consumable);
            await CreateCheckLogAsync("Delete", consumable);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeConsumableAsync(List<Guid> ids)
        {
            List<Consumable> accessories = new List<Consumable>();
            foreach (Guid id in ids)
            {
                Consumable consumable = await GetByIdAsync(id);
                await _permissionService.VerifyCompanyAccessAsync(consumable.CompanyId);
                accessories.Add(consumable);
            }
            foreach (Consumable consumable in accessories)
            {
                await _consumableRepository.CanDeleteAsync(consumable.Id);
                await CreateCheckLogAsync("Delete", consumable);
                _consumableRepository.Remove(consumable);
            }
            await _unitOfWork.CommitAsync();
        }

        public async Task<EmployeeProductDto> CheckInAsync(EmployeeProductCheckInDto checkInDto)
        {
            Employee employee = await _employeeRepository.GetByIdAsync(checkInDto.EmployeeId);
            Consumable consumable = await GetByIdAsync(checkInDto.ProductId);
            await _permissionService.VerifyCompanyAccessAsync(consumable.CompanyId);
            int availableQuantity = await _consumableRepository.GetAvaliableQuantityAsync(
                consumable
            );
            if (availableQuantity - checkInDto.Quantity < 0)
            {
                throw new Exception("Consumable stock is not enough");
            }
            EmployeeProduct employeeProduct = new EmployeeProduct
            {
                Id = Guid.NewGuid(),
                ConsumableId = consumable.Id,
                EmployeeId = checkInDto.EmployeeId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Quantity = checkInDto.Quantity,
                Notes = checkInDto.Notes,
            };
            await _employeeProductRepository.AddAsync(employeeProduct);
            await CreateCheckLogAsync("CheckIn", consumable, employee, checkInDto.Quantity);
            await _unitOfWork.CommitAsync();
            return await _employeeProductRepository.GetDtoAsync(employeeProduct);
        }

        public async Task<List<EmployeeProductDto>> CheckOutAsync(
            EmployeeProductCheckOutDto checkOutDto
        )
        {
            List<EmployeeProduct> employeeProducts = new List<EmployeeProduct>();
            EmployeeProduct employeeProduct = await _employeeProductRepository.GetByIdAsync(
                checkOutDto.EmployeeProductId
            );
            Consumable consumable = await GetByIdAsync((Guid)employeeProduct.ConsumableId);
            await _permissionService.VerifyCompanyAccessAsync(consumable.CompanyId);
            bool isEmployeeChanged =
                checkOutDto.EmployeeId != null
                && checkOutDto.EmployeeId != employeeProduct.EmployeeId;
            switch (employeeProduct.Quantity - checkOutDto.Quantity)
            {
                case 0:
                    await CreateCheckLogAsync("CheckOut", consumable, checkOutDto.Quantity);
                    if (isEmployeeChanged)
                    {
                        employeeProduct.EmployeeId = (Guid)checkOutDto.EmployeeId;
                        _employeeProductRepository.Update(employeeProduct, employeeProduct);
                        await CreateCheckLogAsync(
                            "CheckIn",
                            consumable,
                            await _employeeRepository.GetByIdAsync((Guid)checkOutDto.EmployeeId),
                            checkOutDto.Quantity
                        );
                        employeeProducts.Add(employeeProduct);
                    }
                    else
                    {
                        await CreateCheckLogAsync("CheckOut", consumable, checkOutDto.Quantity);
                        _employeeProductRepository.Remove(employeeProduct);
                    }
                    await _unitOfWork.CommitAsync();
                    ;
                    return await _employeeProductRepository.GetDtosAsync(employeeProducts);
                case < 0:
                    throw new Exception(
                        "Quantity must be less than or equal to the quantity in stock"
                    );
                case > 0:
                    employeeProduct.Quantity -= checkOutDto.Quantity;
                    _employeeProductRepository.Update(employeeProduct, employeeProduct);
                    await CreateCheckLogAsync("CheckOut", consumable, checkOutDto.Quantity);
                    employeeProducts.Add(employeeProduct);
                    if (isEmployeeChanged)
                    {
                        EmployeeProduct newEmployeeProduct = new EmployeeProduct
                        {
                            Id = Guid.NewGuid(),
                            ConsumableId = consumable.Id,
                            EmployeeId = (Guid)checkOutDto.EmployeeId,
                            AssignDate = DateTime.UtcNow,
                            CreatedDate = DateTime.UtcNow,
                            Quantity = checkOutDto.Quantity,
                            Notes = checkOutDto.Notes,
                        };
                        await CreateCheckLogAsync(
                            "CheckIn",
                            consumable,
                            await _employeeRepository.GetByIdAsync((Guid)checkOutDto.EmployeeId),
                            checkOutDto.Quantity
                        );
                        await _employeeProductRepository.AddAsync(newEmployeeProduct);
                        employeeProducts.Add(newEmployeeProduct);
                    }
                    await _unitOfWork.CommitAsync();
                    return await _employeeProductRepository.GetDtosAsync(employeeProducts);
            }
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
            var result = await _filterService.FilterAsync(filter);
            var list = await _consumableRepository.GetDtosAsync(result.ToList());
            var companyIds = await _permissionService.GetCompanyIdsAsync();
            return list.Where(x => companyIds.Contains(x.CompanyId)).ToList();
        }

        public async Task CreateCheckLogAsync(
            string action,
            Consumable consumable,
            Employee employee,
            int quantity
        )
        {
            await _customLogService.CreateCustomLog(
                action,
                "Consumable",
                consumable.Id,
                consumable.Name,
                "Employee",
                employee.Id,
                employee.FirstName + employee.LastName,
                "Checked " + quantity + " units"
            );
        }

        public async Task CreateCheckLogAsync(string action, Consumable consumable, int quantity)
        {
            await _customLogService.CreateCustomLog(
                action,
                "Consumable",
                consumable.Id,
                consumable.Name,
                "Checked " + quantity + " units"
            );
        }

        public async Task CreateCheckLogAsync(string action, Consumable consumable)
        {
            await _customLogService.CreateCustomLog(
                action,
                "Consumable",
                consumable.Id,
                consumable.Name
            );
        }

        public async Task CreateCheckLogAsync(string action, Consumable consumable, Company company)
        {
            await _customLogService.CreateCustomLog(
                action,
                "Consumable",
                consumable.Id,
                consumable.Name,
                "Company",
                company.Id,
                company.Name
            );
        }

        
        public async Task<List<ConsumableDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            return await _consumableRepository.GetDisplayDtos(ids);
        }
    }
}
