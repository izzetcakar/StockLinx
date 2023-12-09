﻿using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IAssetService : IService<Asset>
    {
        Task<AssetDto> GetDto(Guid id);
        Task<List<AssetDto>> GetAllDtos();
        Task<List<AssetDto>> CreateAssetAsync(AssetCreateDto createDto);
        Task<List<AssetDto>> CreateRangeAssetAsync(List<AssetCreateDto> createDtos);
        Task<AssetDto> UpdateAssetAsync(AssetUpdateDto updateDto);
        Task DeleteAssetAsync(Guid assetId);
        Task DeleteRangeAssetAsync(List<Guid> assetIds);
        Task<AssetCheckInResponseDto> CheckIn(AssetCheckInDto checkInDto);
        Task<AssetDto> CheckOut(Guid id);
    }
}
