using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
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

        public CategoryDto GetDto(Category entity)
        {
            return _mapper.Map<CategoryDto>(entity);
        }
        public List<CategoryDto> GetDtos(List<Category> entities)
        {
            var dtos = new List<CategoryDto>();
            dtos = _mapper.Map<List<CategoryDto>>(entities);
            return dtos;
        }
        public async Task<List<CategoryDto>> GetAllDtos()
        {
            var entities = await dbContext.Categories.Where(c => c.DeletedDate == null).AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
