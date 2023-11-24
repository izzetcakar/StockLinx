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
    public class ModelFieldDataController : CustomBaseController
    {
        private readonly IModelFieldDataService _modelFieldDataService;
        private readonly IMapper _mapper;
        public ModelFieldDataController(IMapper mapper, IModelFieldDataService modelFieldDataService)
        {
            _modelFieldDataService = modelFieldDataService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var modelFieldDatas = await _modelFieldDataService.GetModelFieldDataDtos();
            return CreateActionResult(CustomResponseDto<List<ModelFieldDataDto>>.Success(200, modelFieldDatas));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var modelFieldData = await _modelFieldDataService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<ModelFieldData>.Success(200, modelFieldData));
        }

        [HttpPost]
        public async Task<IActionResult> Add(ModelFieldDataDto dto)
        {
            await _modelFieldDataService.CreateModelFieldDataAsync(dto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeModelFieldDatas(List<ModelFieldDataDto> dtos)
        {
            await _modelFieldDataService.CreateRangeModelFieldDataAsync(dtos);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(ModelFieldDataDto dto)
        {
            await _modelFieldDataService.UpdateModelFieldDataAsync(dto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var modelFieldData = await _modelFieldDataService.GetByIdAsync(id);
            await _modelFieldDataService.RemoveAsync(modelFieldData);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeModelFieldDatas(List<Guid> ids)
        {
            await _modelFieldDataService.DeleteRangeModelFieldDataAsync(ids);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
