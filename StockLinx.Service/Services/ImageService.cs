using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ImageService : Service<Image>, IImageService
    {
        public ImageService(IRepository<Image> repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
        }
    }
}
