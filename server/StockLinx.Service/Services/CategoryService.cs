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
using StockLinx.Repository.UnitOfWork;

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
        public async Task<List<CategoryDto>> GetCategoryDtos()
        {
            var categories = await _categoryRepository.GetAll().Include(x => x.Branch)
                .Select(x => new CategoryDto
                {
                    Id = x.Id,
                    CompanyId = x.Branch.CompanyId,
                    BranchId = x.BranchId,
                    Name = x.Name,
                    ImagePath = x.ImagePath,
                    Type = x.Type,
                }).ToListAsync();
            return categories;
        }
        public async Task CreateCategoryAsync(CategoryCreateDto createDto)
        {
            var newCategory = _mapper.Map<Category>(createDto);
            newCategory.Id = Guid.NewGuid();
            newCategory.CreatedDate = DateTime.UtcNow;

            //Check if newCategory.ImagePath is base64 or not and not null
            if (newCategory.ImagePath != null && newCategory.ImagePath.Contains("data:image/png;base64,"))
            {
                string base64 = newCategory.ImagePath.Substring(newCategory.ImagePath.IndexOf(',') + 1);
                string path = newCategory.Name + DateTime.Now.ToString("yyyyMMddHHmmss");
                ImageHandler.UploadBase64AsFile(base64, path);
            }
            await AddAsync(newCategory);
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
        public async Task<List<ProductCategoryCounterDto>> GetCounts()
        {
            var counts = await _categoryRepository.GetCounts();
            return counts;
        }
    }
}
