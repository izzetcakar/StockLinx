using StockLinx.Core.DTOs.Create;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IImageService : IService<Image>
    {
        Task AddImageAsync(ImageCreateDto imageCreateDto);
    }
}
