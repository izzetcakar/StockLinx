using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IManufacturerService : IService<Manufacturer>
    {
        Task<List<ManufacturerDto>> GetManufacturerDtos();
        Task CreateManufacturerAsync(ManufacturerCreateDto createDto);
        Task UpdateManufacturerAsync(ManufacturerUpdateDto updateDto);
        Task DeleteManufacturerAsync(Guid manufacturerId);
    }
}
