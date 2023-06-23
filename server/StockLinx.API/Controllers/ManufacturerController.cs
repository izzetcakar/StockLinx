﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManufacturerController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IManufacturerService _manufacturerService;

        public ManufacturerController(IMapper mapper, IManufacturerService manufacturerService)
        {
            _mapper = mapper;
            _manufacturerService = manufacturerService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var manufacturers = await _manufacturerService.GetAllAsync();
            return CreateActionResult(CustomResponseDto<List<Manufacturer>>.Success(200, manufacturers.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var manufacturer = await _manufacturerService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Manufacturer>.Success(200, manufacturer));
        }

        [HttpPost]
        public async Task<IActionResult> Add(ManufacturerCreateDto manufacturerCreateDto)
        {
            var newManufacturer = _mapper.Map<Manufacturer>(manufacturerCreateDto);
            newManufacturer.Id = Guid.NewGuid();
            await _manufacturerService.AddAsync(newManufacturer);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(ManufacturerDto manufacturerDto)
        {
            // Update
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var manufacturer = await _manufacturerService.GetByIdAsync(id);
            await _manufacturerService.RemoveAsync(manufacturer);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}