using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelFieldDataController : CustomBaseController
    {
        private readonly IModelFieldDataService _modelFieldDataService;
        public ModelFieldDataController(IModelFieldDataService modelFieldDataService)
        {
            _modelFieldDataService = modelFieldDataService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                List<ModelFieldDataDto> result = await _modelFieldDataService.GetAllDtosAsync();
                return CreateActionResult(CustomResponseDto<List<ModelFieldDataDto>>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            try
            {
                ModelFieldDataDto result = await _modelFieldDataService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<ModelFieldDataDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(ModelFieldDataDto dto)
        {
            try
            {
                ModelFieldDataDto result = await _modelFieldDataService.CreateModelFieldDataAsync(dto);
                return CreateActionResult(CustomResponseDto<ModelFieldDataDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeModelFieldDatas(List<ModelFieldDataDto> dtos)
        {
            try
            {
                List<ModelFieldDataDto> result = await _modelFieldDataService.CreateRangeModelFieldDataAsync(dtos);
                return CreateActionResult(CustomResponseDto<List<ModelFieldDataDto>>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(ModelFieldDataDto dto)
        {
            try
            {
                ModelFieldDataDto result = await _modelFieldDataService.UpdateModelFieldDataAsync(dto);
                return CreateActionResult(CustomResponseDto<ModelFieldDataDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _modelFieldDataService.DeleteModelFieldDataAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeModelFieldDatas(List<Guid> ids)
        {
            try
            {
                await _modelFieldDataService.DeleteRangeModelFieldDataAsync(ids);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
