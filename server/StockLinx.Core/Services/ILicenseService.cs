using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
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
        Task<EmployeeProductDto> CheckInAsync(EmployeeProductCheckInDto checkInDto);
        Task<AssetProductDto> CheckInAsync(AssetProductCheckInDto checkInDto);
        Task<List<EmployeeProductDto>> EmployeeCheckOutAsync(
            EmployeeProductCheckOutDto checkOutDto
        );
        Task<List<AssetProductDto>> AssetCheckOutAsync(AssetProductCheckOutDto checkOutDto);
        Task CheckTagExistAsync(Guid companyId, string tag);
        Task CheckTagExistAsync(Guid companyId, List<string> tags);
        Task<List<LicenseDto>> FilterAllAsync(string filter);
        Task<List<LicenseDisplayDto>> GetDisplayDtos(List<Guid> ids);
        Task<List<LicenseProductDisplayDto>> GetProductDisplayDtos(List<Guid> ids);
    }
}
