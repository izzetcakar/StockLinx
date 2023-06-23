using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IImageService : IService<Image>
    {
        Task AddImageAsync(ImageCreateDto createDto);
        Task UpdateImageAsync(ImageUpdateDto updateDto);
        Task DeleteImageAsync(Guid imageId);
    }
}
