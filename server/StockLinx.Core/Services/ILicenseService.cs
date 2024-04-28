using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ILicenseService : IService<License>
    {
        Task<LicenseDto> GetDtoAsync(Guid id);
        Task<List<LicenseDto>> GetAllDtosAsync();
        Task<LicenseDto> CreateLicenseAsync(LicenseCreateDto dto);
        Task<List<LicenseDto>> CreateRangeLicenseAsync(List<LicenseCreateDto> dtos);
        Task<LicenseDto> UpdateLicenseAsync(LicenseUpdateDto dto);
        Task DeleteLicenseAsync(Guid id);
        Task DeleteRangeLicenseAsync(List<Guid> ids);
        Task<UserProduct> CheckInAsync(UserProductCheckInDto checkInDto);
        Task<AssetProduct> CheckInAsync(AssetProductCheckInDto checkInDto);
        Task CheckOutAsync(Guid id);
    }
}
