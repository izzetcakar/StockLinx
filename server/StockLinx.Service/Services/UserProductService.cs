using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;
using StockLinx.Repository.Repositories.EF_Core;

namespace StockLinx.Service.Services
{
    public class UserProductService : Service<UserProduct>, IUserProductService
    {
        private readonly IUserProductRepository _UserProductRepository;
        private readonly IFilterService<UserProduct> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public UserProductService(
            IRepository<UserProduct> repository,
            IUserProductRepository UserProductRepository,
            IFilterService<UserProduct> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _UserProductRepository = UserProductRepository;
            _filterService = filterService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<UserProductDto> GetDtoAsync(Guid id)
        {
            UserProduct UserProduct = await GetByIdAsync(id);
            return await _UserProductRepository.GetDtoAsync(UserProduct);
        }

        public async Task<List<UserProductDto>> GetAllDtosAsync()
        {
            return await _UserProductRepository.GetAllDtosAsync();
        }

        public async Task<UserProductDto> CreateUserProductAsync(UserProductCreateDto dto)
        {
            UserProduct UserProduct = _mapper.Map<UserProduct>(dto);
            await _UserProductRepository.AddAsync(UserProduct);
            await _unitOfWork.CommitAsync();
            return await _UserProductRepository.GetDtoAsync(UserProduct);
        }

        public async Task<List<UserProductDto>> CreateRangeUserProductAsync(
            List<UserProductCreateDto> dtos
        )
        {
            List<UserProduct> UserProducts = new List<UserProduct>();
            foreach (UserProductCreateDto dto in dtos)
            {
                UserProduct UserProduct = _mapper.Map<UserProduct>(dto);
                UserProducts.Add(UserProduct);
            }
            await _UserProductRepository.AddRangeAsync(UserProducts);
            await _unitOfWork.CommitAsync();
            return await _UserProductRepository.GetDtosAsync(UserProducts);
        }

        public async Task DeleteUserProductAsync(Guid id)
        {
            UserProduct UserProduct = await GetByIdAsync(id);
            _UserProductRepository.Remove(UserProduct);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<UserProductDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return await _UserProductRepository.GetDtosAsync(result.ToList());
        }
    }
}
