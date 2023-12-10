using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelController : CustomBaseController
    {
        private readonly IModelService _modelService;

        public ModelController(IModelService modelService)
        {
            _modelService = modelService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var models = await _modelService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<ModelDto>>.Success(200, models));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var modelDto = await _modelService.GetDto(id);
            return CreateActionResult(CustomResponseDto<ModelDto>.Success(200, modelDto));
        }

        [HttpPost]
        public async Task<IActionResult> Add(ModelCreateDto createDto)
        {
            var added = await _modelService.CreateModelAsync(createDto);
            return CreateActionResult(CustomResponseDto<ModelDto>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeModels(List<ModelCreateDto> createDtos)
        {
            var added = await _modelService.CreateRangeModelAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<ModelDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(ModelUpdateDto updateDto)
        {
            await _modelService.UpdateModelAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _modelService.DeleteModelAsync(id);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeModels(List<Guid> modelIds)
        {
            await _modelService.DeleteRangeModelAsync(modelIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
