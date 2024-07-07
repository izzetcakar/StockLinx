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
    public class CategoryService : Service<Category>, ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IFilterService<Category> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CategoryService(
            IRepository<Category> repository,
            ICategoryRepository categoryRepository,
            IFilterService<Category> filterService,
            ICustomLogService customLogService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _categoryRepository = categoryRepository;
            _customLogService = customLogService;
            _filterService = filterService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<CategoryDto> GetDtoAsync(Guid id)
        {
            Category category = await GetByIdAsync(id);
            return _categoryRepository.GetDto(category);
        }

        public async Task<List<CategoryDto>> GetAllDtosAsync()
        {
            return await _categoryRepository.GetAllDtosAsync();
        }

        public async Task<CategoryDto> CreateCategoryAsync(CategoryCreateDto dto)
        {
            Category category = _mapper.Map<Category>(dto);
            await _categoryRepository.AddAsync(category);
            await _customLogService.CreateCustomLog(
                "Create",
                "Category",
                category.Id,
                category.Name
            );
            await _unitOfWork.CommitAsync();
            return _categoryRepository.GetDto(category);
        }

        public async Task<List<CategoryDto>> CreateRangeCategoryAsync(List<CategoryCreateDto> dtos)
        {
            List<Category> categories = new List<Category>();
            foreach (CategoryCreateDto dto in dtos)
            {
                Category category = _mapper.Map<Category>(dto);
                categories.Add(category);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "Category",
                    category.Id,
                    category.Name
                );
            }
            await _categoryRepository.AddRangeAsync(categories);
            await _unitOfWork.CommitAsync();
            return _categoryRepository.GetDtos(categories);
        }

        public async Task<CategoryDto> UpdateCategoryAsync(CategoryUpdateDto dto)
        {
            Category categoryInDb = await GetByIdAsync(dto.Id);
            Category category = _mapper.Map<Category>(dto);
            category.UpdatedDate = DateTime.UtcNow;
            _categoryRepository.Update(categoryInDb, category);
            await _customLogService.CreateCustomLog(
                "Update",
                "Category",
                category.Id,
                category.Name
            );
            await _unitOfWork.CommitAsync();
            return _categoryRepository.GetDto(category);
        }

        public async Task DeleteCategoryAsync(Guid id)
        {
            Category category = await GetByIdAsync(id);
            _categoryRepository.Remove(category);
            await _customLogService.CreateCustomLog(
                "Delete",
                "Category",
                category.Id,
                category.Name
            );
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeCategoryAsync(List<Guid> ids)
        {
            List<Category> categories = new List<Category>();
            foreach (Guid id in ids)
            {
                Category category = await GetByIdAsync(id);
                categories.Add(category);
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "Category",
                    category.Id,
                    category.Name
                );
            }
            _categoryRepository.RemoveRange(categories);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<CategoryDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return _categoryRepository.GetDtos(result.ToList());
        }
    }
}
