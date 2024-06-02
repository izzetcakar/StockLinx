﻿using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class userProductController : CustomBaseController
    {
        private readonly IUserProductService _userProductService;

        public userProductController(IUserProductService userProductService)
        {
            _userProductService = userProductService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                //List<UserProductDto> result = await _userProductService.GetAllDtosAsync();
                IEnumerable<UserProduct> result = await _userProductService.GetAllAsync();
                return CreateActionResult(
                    CustomResponseDto<List<UserProduct>>.Success(200, result.ToList())
                );
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
                //UserProductDto result = await _userProductService.GetDtoAsync(id);
                UserProduct result = await _userProductService.GetByIdAsync(id);
                return CreateActionResult(CustomResponseDto<UserProduct>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(UserProductCreateDto dto)
        {
            try
            {
                UserProductDto result = await _userProductService.CreateUserProductAsync(dto);
                return CreateActionResult(CustomResponseDto<UserProductDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRange(List<UserProductCreateDto> dto)
        {
            try
            {
                List<UserProductDto> result = await _userProductService.CreateRangeUserProductAsync(
                    dto
                );
                return CreateActionResult(
                    CustomResponseDto<List<UserProductDto>>.Success(201, result)
                );
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
                await _userProductService.DeleteUserProductAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpGet("filter")]
        public async Task<IActionResult> Filter([FromQuery] string? filter)
        {
            try
            {
                if (string.IsNullOrEmpty(filter))
                {
                    return await All();
                }
                List<UserProductDto> result = await _userProductService.FilterAllAsync(filter);
                return CreateActionResult(
                    CustomResponseDto<List<UserProductDto>>.Success(200, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
