﻿using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IManufacturerService : IService<Manufacturer>
    {
        Task<List<ManufacturerDto>> GetAllDtos();
        Task<ManufacturerDto> CreateManufacturerAsync(ManufacturerCreateDto createDto);
        Task<List<ManufacturerDto>> CreateRangeManufacturerAsync(List<ManufacturerCreateDto> createDtos);
        Task UpdateManufacturerAsync(ManufacturerUpdateDto updateDto);
        Task DeleteManufacturerAsync(Guid manufacturerId);
        Task DeleteRangeManufacturerAsync(List<Guid> manufacturerIds);
    }
}
