using AutoMapper;
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
    public class CategoryService : Service<Category>, ICategoryService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(IRepository<Category> repository, ICategoryRepository categoryRepository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _categoryRepository = categoryRepository;
        }
        public async Task<List<CategoryDto>> GetAllDtos()
        {
            return await _categoryRepository.GetAllDtos();
        }
        public async Task<CategoryDto> CreateCategoryAsync(CategoryCreateDto createDto)
        {
            var newCategory = _mapper.Map<Category>(createDto);
            newCategory.Id = Guid.NewGuid();
            newCategory.CreatedDate = DateTime.UtcNow;
            var addedCategory = await AddAsync(newCategory);
            return _categoryRepository.GetDto(addedCategory);
        }
        public async Task<List<CategoryDto>> CreateRangeCategoryAsync(List<CategoryCreateDto> createDtos)
        {
            var newCategories = new List<Category>();
            foreach (var createDto in createDtos)
            {
                var newCategory = _mapper.Map<Category>(createDto);
                newCategory.Id = Guid.NewGuid();
                newCategory.CreatedDate = DateTime.UtcNow;
                newCategories.Add(newCategory);
            }
            var addedCategories = await AddRangeAsync(newCategories);
            return _categoryRepository.GetDtos(addedCategories.ToList());
        }
        public async Task UpdateCategoryAsync(CategoryUpdateDto updateDto)
        {
            var categoryInDb = await GetByIdAsync(updateDto.Id);
            if (categoryInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the category to update is null.");
            }
            var updatedCategory = _mapper.Map<Category>(updateDto);
            updatedCategory.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(categoryInDb, updatedCategory);
            await _unitOfWork.CommitAsync();
        }
        public async Task DeleteCategoryAsync(Guid categoryId)
        {
            if (categoryId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(categoryId), "The ID of the category to delete is null.");
            }
            var category = await GetByIdAsync(categoryId);
            if (category == null)
            {
                throw new ArgumentNullException(nameof(category), "The category to delete is null.");
            }
            await RemoveAsync(category);
        }
        public async Task DeleteRangeCategoryAsync(List<Guid> categoryIds)
        {
            var categories = new List<Category>();
            foreach (var categoryId in categoryIds)
            {
                var category = GetByIdAsync(categoryId).Result;
                categories.Add(category);
            }
            await RemoveRangeAsync(categories);
        }
        public async Task<List<ProductCategoryCounterDto>> GetCounts()
        {
            var counts = await _categoryRepository.GetCounts();
            return counts;
        }

    }
}
