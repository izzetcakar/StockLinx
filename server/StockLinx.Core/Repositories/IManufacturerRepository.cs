using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IManufacturerRepository : IRepository<Manufacturer>
    {
        ManufacturerDto GetDto(Manufacturer entity);
        List<ManufacturerDto> GetDtos(List<Manufacturer> entities);
        Task<List<ManufacturerDto>> GetManufacturersPagedAsync(int skip, int take, Dictionary<string, string> filters);
        Task<List<ManufacturerDto>> GetAllDtosAsync();
    }
}
