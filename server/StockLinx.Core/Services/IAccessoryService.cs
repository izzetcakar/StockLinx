using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IAccessoryService : IService<Accessory>
    {
        Task<AccessoryDto> GetDtoAsync(Guid id);
        Task<List<AccessoryDto>> GetAllDtosAsync();
        Task<AccessoryDto> CreateAccessoryAsync(AccessoryCreateDto dto);
        Task<List<AccessoryDto>> CreateRangeAccessoryAsync(List<AccessoryCreateDto> dtos);
        Task<AccessoryDto> UpdateAccessoryAsync(AccessoryUpdateDto dto);
        Task DeleteAccessoryAsync(Guid id);
        Task DeleteRangeAccessoryAsync(List<Guid> ids);
        Task<EmployeeProductDto> CheckInAsync(EmployeeProductCheckInDto checkInDto);
        Task<List<EmployeeProductDto>> CheckOutAsync(EmployeeProductCheckOutDto checkOutDto);
        Task CheckTagExistAsync(string tag);
        Task CheckTagExistAsync(List<string> tags);
        Task<List<AccessoryDto>> FilterAllAsync(string filter);
        Task<List<AccessoryDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
