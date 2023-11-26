using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IManufacturerRepository : IRepository<Manufacturer>
    {
        ManufacturerDto GetManufacturerDto(Manufacturer manufacturer);
        List<ManufacturerDto> GetManufacturerDtos(List<Manufacturer> manufacturers);
        Task<List<ManufacturerDto>> GetAllManufacturerDtos();
    }
}
