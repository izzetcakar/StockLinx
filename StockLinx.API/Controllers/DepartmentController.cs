using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IConsumableService _consumableService;
        public ConsumableController(IMapper mapper, IConsumableService consumableService)
        {
            _mapper = mapper;
            _consumableService = consumableService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var consumables = await _consumableService.GetAllAsync();
            return CreateActionResult(CustomResponseDto<List<Consumable>>.Success(200, consumables.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var consumable = await _consumableService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Consumable>.Success(200, consumable));
        }

        [HttpPost]
        public async Task<IActionResult> Add(ConsumableDto consumableDto)
        {
            //Create
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(ConsumableDto consumableDto)
        {
            //Update
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var consumable = await _consumableService.GetByIdAsync(id);
            await _consumableService.RemoveAsync(consumable);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
