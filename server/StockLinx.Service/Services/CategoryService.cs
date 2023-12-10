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
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public CategoryService(IRepository<Category> repository, ICategoryRepository categoryRepository,
            IUnitOfWork unitOfWork, IMapper mapper, ICustomLogService customLogService) : base(repository, unitOfWork)
        {
            _categoryRepository = categoryRepository;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<CategoryDto> GetDto(Guid id)
        {
            var category = await GetByIdAsync(id);
            return _categoryRepository.GetDto(category);
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
            await _categoryRepository.AddAsync(newCategory);
            await _customLogService.CreateCustomLog("Create", newCategory.Id, null, "Category", null);
            await _unitOfWork.CommitAsync();
            return _categoryRepository.GetDto(newCategory);
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
                await _customLogService.CreateCustomLog("Create", newCategory.Id, null, "Category", null);
            }
            await _categoryRepository.AddRangeAsync(newCategories);
            await _unitOfWork.CommitAsync();
            return _categoryRepository.GetDtos(newCategories.ToList());
        }

        public async Task<CategoryDto> UpdateCategoryAsync(CategoryUpdateDto updateDto)
        {
            var categoryInDb = await GetByIdAsync(updateDto.Id);
            if (categoryInDb == null)
            {
                throw new ArgumentNullException("Category is not found");
            }
            var updatedCategory = _mapper.Map<Category>(updateDto);
            updatedCategory.UpdatedDate = DateTime.UtcNow;
            _categoryRepository.Update(categoryInDb, updatedCategory);
            await _customLogService.CreateCustomLog("Update", updatedCategory.Id, null, "Category", null);
            await _unitOfWork.CommitAsync();
            return _categoryRepository.GetDto(updatedCategory);
        }

        public async Task DeleteCategoryAsync(Guid categoryId)
        {
            var category = await GetByIdAsync(categoryId);
            if (category == null)
            {
                throw new ArgumentNullException("Category is not found");
            }
            category.DeletedDate = DateTime.UtcNow;
            _categoryRepository.Update(category, category);
            await _customLogService.CreateCustomLog("Delete", categoryId, null, "Category", null);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeCategoryAsync(List<Guid> categoryIds)
        {
            var categories = new List<Category>();
            foreach (var categoryId in categoryIds)
            {
                var category = await GetByIdAsync(categoryId);
                category.DeletedDate = DateTime.UtcNow;
                categories.Add(category);
                await _customLogService.CreateCustomLog("Delete", categoryId, null, "Category", null);
            }
            _categoryRepository.UpdateRange(categories);
            await _unitOfWork.CommitAsync();
        }
    }
}
