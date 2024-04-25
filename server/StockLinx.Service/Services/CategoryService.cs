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

        public CategoryService(
            IRepository<Category> repository,
            ICategoryRepository categoryRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ICustomLogService customLogService
        )
            : base(repository, unitOfWork)
        {
            _categoryRepository = categoryRepository;
            _customLogService = customLogService;
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
            category.Id = Guid.NewGuid();
            category.CreatedDate = DateTime.UtcNow;
            await _categoryRepository.AddAsync(category);
            await _customLogService.CreateCustomLog("Create", "Category", category.Name);
            await _unitOfWork.CommitAsync();
            return _categoryRepository.GetDto(category);
        }

        public async Task<List<CategoryDto>> CreateRangeCategoryAsync(List<CategoryCreateDto> dtos)
        {
            var categories = new List<Category>();
            foreach (var dto in dtos)
            {
                Category category = _mapper.Map<Category>(dto);
                category.Id = Guid.NewGuid();
                category.CreatedDate = DateTime.UtcNow;
                categories.Add(category);
                await _customLogService.CreateCustomLog("Create", "Category", category.Name);
            }
            await _categoryRepository.AddRangeAsync(categories);
            await _unitOfWork.CommitAsync();
            return _categoryRepository.GetDtos(categories);
        }

        public async Task<CategoryDto> UpdateCategoryAsync(CategoryUpdateDto dto)
        {
            var categoryInDb = await GetByIdAsync(dto.Id);
            if (categoryInDb == null)
            {
                throw new ArgumentNullException("Category is not found");
            }
            var category = _mapper.Map<Category>(dto);
            category.UpdatedDate = DateTime.UtcNow;
            _categoryRepository.Update(categoryInDb, category);
            await _customLogService.CreateCustomLog("Update","Category",category.Name);
            await _unitOfWork.CommitAsync();
            return _categoryRepository.GetDto(category);
        }

        public async Task DeleteCategoryAsync(Guid id)
        {
            var category = await GetByIdAsync(id);
            if (category == null)
            {
                throw new ArgumentNullException("Category is not found");
            }
            _categoryRepository.Remove(category);
            await _customLogService.CreateCustomLog("Delete", "Category", category.Name);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeCategoryAsync(List<Guid> ids)
        {
            var categories = new List<Category>();
            foreach (var id in ids)
            {
                var category = await GetByIdAsync(id);
                if (category == null)
                {
                    throw new ArgumentNullException("Category is not found");
                }
                categories.Add(category);
                await _customLogService.CreateCustomLog("Delete", "Category", category.Name);
            }
            _categoryRepository.RemoveRange(categories);
            await _unitOfWork.CommitAsync();
        }
    }
}
