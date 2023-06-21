using AutoMapper;
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
    public class ModelController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IModelService _modelService;

        public ModelController(IMapper mapper, IModelService modelService)
        {
            _mapper = mapper;
            _modelService = modelService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var models = await _modelService.GetAllAsync();
            return CreateActionResult(CustomResponseDto<List<Model>>.Success(200, models.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var model = await _modelService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Model>.Success(200, model));
        }

        [HttpPost]
        public async Task<IActionResult> Add(ModelCreateDto createDto)
        {
            await _modelService.CreateModelAsync(createDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(ModelDto modelDto)
        {
            // Update
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var model = await _modelService.GetByIdAsync(id);
            await _modelService.RemoveAsync(model);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
