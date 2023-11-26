using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        private readonly IMapper _mapper;
        public CategoryRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public CategoryDto GetCategoryDto(Category category)
        {
            var categoryDto = _mapper.Map<CategoryDto>(category);
            return categoryDto;
        }
        public List<CategoryDto> GetCategoryDtos(List<Category> categories)
        {
            var categoryDtos = new List<CategoryDto>();
            categoryDtos = _mapper.Map<List<CategoryDto>>(categories);
            return categoryDtos;
        }
        public async Task<List<CategoryDto>> GetAllCategoryDtos()
        {
            var categories = await dbContext.Categories.AsNoTracking().ToListAsync();
            return GetCategoryDtos(categories);
        }
        public Task<List<ProductCategoryCounterDto>> GetCounts()
        {
            var counts = dbContext.Categories
               .Select(x => new ProductCategoryCounterDto
               {
                   CategoryId = x.Id,
                   CategoryName = x.Name,
                   AssetCount = x.Assets.Count,
                   LicenseCount = x.Licenses.Count,
                   AccessoryCount = x.Accessories.Count,
                   ConsumableCount = x.Consumables.Count,
                   ComponentCount = x.Components.Count,
               }).ToListAsync();

            return counts;
        }
    }
}
