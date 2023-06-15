using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessoryController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IAccessoryService _accessoryService;
        public AccessoryController(IMapper mapper, IAccessoryService accessoryService)
        {
            _mapper = mapper;
            _accessoryService = accessoryService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var accessories = await _accessoryService.GetAllAsync();
            return CreateActionResult(CustomResponseDto<List<Accessory>>.Success(200, accessories.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var accessory = await _accessoryService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Accessory>.Success(200, accessory));
        }

        [HttpPost]
        public async Task<IActionResult> Add(AccessoryDto accessoryDto)
        {
            //Create
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(AccessoryDto accessoryDto)
        {
            //Update
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var accessory = await _accessoryService.GetByIdAsync(id);
            await _accessoryService.RemoveAsync(accessory);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
