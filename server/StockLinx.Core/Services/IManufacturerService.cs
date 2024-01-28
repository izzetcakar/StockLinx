using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IManufacturerService : IService<Manufacturer>
    {
        Task<ManufacturerDto> GetDto(Guid id);
        Task<List<ManufacturerDto>> GetAllDtos();
        Task<List<ManufacturerDto>> GetManufacturersPagedAsync(int skip, int top);
        Task<ManufacturerDto> CreateManufacturerAsync(ManufacturerCreateDto createDto);
        Task<List<ManufacturerDto>> CreateRangeManufacturerAsync(List<ManufacturerCreateDto> createDtos);
        Task<ManufacturerDto> UpdateManufacturerAsync(ManufacturerUpdateDto updateDto);
        Task DeleteManufacturerAsync(Guid manufacturerId);
        Task DeleteRangeManufacturerAsync(List<Guid> manufacturerIds);
    }
}
