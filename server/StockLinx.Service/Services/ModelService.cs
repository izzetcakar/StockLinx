using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ModelService : Service<Model>, IModelService
    {
        private readonly IMapper _mapper;
        public ModelService(IRepository<Model> repository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task CreateModelAsync(ModelCreateDto createDto)
        {
            var newModel = _mapper.Map<Model>(createDto);
            newModel.Id = Guid.NewGuid();
            await AddAsync(newModel);
        }
    }
}
