using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
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
            var models = await _modelService.GetModelDtos();
            return CreateActionResult(CustomResponseDto<List<ModelDto>>.Success(200, models));
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

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeModels(List<ModelCreateDto> createDtos)
        {
            await _modelService.CreateRangeModelAsync(createDtos);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
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
            var model = await _modelService.GetByIdAsync(id);
            await _modelService.RemoveAsync(model);
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
