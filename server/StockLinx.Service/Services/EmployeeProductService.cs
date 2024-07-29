using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class EmployeeProductService : Service<EmployeeProduct>, IEmployeeProductService
    {
        private readonly IEmployeeProductRepository _employeeProductRepository;
        private readonly IFilterService<EmployeeProduct> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public EmployeeProductService(
            IRepository<EmployeeProduct> repository,
            IEmployeeProductRepository EmployeeProductRepository,
            IFilterService<EmployeeProduct> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _employeeProductRepository = EmployeeProductRepository;
            _filterService = filterService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<EmployeeProductDto> GetDtoAsync(Guid id)
        {
            EmployeeProduct EmployeeProduct = await GetByIdAsync(id);
            return await _employeeProductRepository.GetDtoAsync(EmployeeProduct);
        }

        public async Task<List<EmployeeProductDto>> GetAllDtosAsync()
        {
            return await _employeeProductRepository.GetAllDtosAsync();
        }

        public async Task<EmployeeProductDto> CreateEmployeeProductAsync(
            EmployeeProductCreateDto dto
        )
        {
            EmployeeProduct EmployeeProduct = _mapper.Map<EmployeeProduct>(dto);
            await _employeeProductRepository.AddAsync(EmployeeProduct);
            await _unitOfWork.CommitAsync();
            return await _employeeProductRepository.GetDtoAsync(EmployeeProduct);
        }

        public async Task<List<EmployeeProductDto>> CreateRangeEmployeeProductAsync(
            List<EmployeeProductCreateDto> dtos
        )
        {
            List<EmployeeProduct> EmployeeProducts = new List<EmployeeProduct>();
            foreach (EmployeeProductCreateDto dto in dtos)
            {
                EmployeeProduct EmployeeProduct = _mapper.Map<EmployeeProduct>(dto);
                EmployeeProducts.Add(EmployeeProduct);
            }
            await _employeeProductRepository.AddRangeAsync(EmployeeProducts);
            await _unitOfWork.CommitAsync();
            return await _employeeProductRepository.GetDtosAsync(EmployeeProducts);
        }

        public async Task DeleteEmployeeProductAsync(Guid id)
        {
            EmployeeProduct EmployeeProduct = await GetByIdAsync(id);
            _employeeProductRepository.Remove(EmployeeProduct);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<EmployeeProductDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return await _employeeProductRepository.GetDtosAsync(result.ToList());
        }

        public async Task<List<EmployeeProductDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            return await _employeeProductRepository.GetDisplayDtos(ids);
        }
    }
}
