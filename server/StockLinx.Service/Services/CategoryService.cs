using AutoMapper;
using StockLinx.Core.DTOs.Create;
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
        public CategoryService(IRepository<Category> repository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task CreateCategoryAsync(CategoryCreateDto createDto)
        {
            var newCategory = _mapper.Map<Category>(createDto);
            newCategory.Id = Guid.NewGuid();
            await AddAsync(newCategory);
        }
        public Task UpdateCategoryAsync(CategoryUpdateDto updateDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteCategoryAsync(Guid categoryId)
        {
            throw new NotImplementedException();
        }
    }
}
