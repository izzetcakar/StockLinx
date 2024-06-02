using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IManufacturerService : IService<Manufacturer>
    {
        Task<ManufacturerDto> GetDtoAsync(Guid id);
        Task<List<ManufacturerDto>> GetAllDtosAsync();
        Task<ManufacturerDto> CreateManufacturerAsync(ManufacturerCreateDto dto);
        Task<List<ManufacturerDto>> CreateRangeManufacturerAsync(List<ManufacturerCreateDto> dtos);
        Task<ManufacturerDto> UpdateManufacturerAsync(ManufacturerUpdateDto dto);
        Task DeleteManufacturerAsync(Guid id);
        Task DeleteRangeManufacturerAsync(List<Guid> ids);
        Task<List<ManufacturerDto>> FilterAllAsync(string filter);
    }
}
