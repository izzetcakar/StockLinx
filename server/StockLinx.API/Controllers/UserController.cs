﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public UserController(
            IMapper mapper,
            IUserService userservice,
            IConfiguration configuration
        )
        {
            _mapper = mapper;
            _userService = userservice;
            _configuration = configuration;
        }

        [HttpGet, Authorize]
        public async Task<IActionResult> All()
        {
            try
            {
                List<UserDto> result = await _userService.GetAllDtosAsync();
                return CreateActionResult(CustomResponseDto<List<UserDto>>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpGet("{id}"), Authorize]
        public async Task<IActionResult> Get(Guid id)
        {
            try
            {
                UserDto result = await _userService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<UserDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut, Authorize]
        public async Task<IActionResult> Update(UserUpdateDto dto)
        {
            try
            {
                UserDto result = await _userService.UpdateUserAsync(dto);
                return CreateActionResult(CustomResponseDto<UserDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _userService.DeleteUserAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto dto)
        {
            try
            {
                var user = await _userService.Login(dto);
                if (user != null)
                {
                    TokenDto token = new TokenDto();
                    token.Token = CreateToken(user);
                    return CreateActionResult(CustomResponseDto<TokenDto>.Success(200, token));
                }
                return CreateActionResult(
                    CustomResponseDto<NoContentDto>.Fail(401, "User is not found")
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpGet("getWithToken"), Authorize]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                User user = await _userService.GetCurrentUser();
                if (user != null)
                {
                    UserDto dto = _mapper.Map<UserDto>(user);
                    return CreateActionResult(CustomResponseDto<UserDto>.Success(200, dto));
                }
                else
                {
                    return CreateActionResult(
                        CustomResponseDto<NoContentDto>.Fail(404, "User is not found")
                    );
                }
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        private string CreateToken(User user)
        {
            string tokenKey = _configuration["Jwt:Key"];
            string issuer = _configuration["Jwt:Issuer"];
            var audiences = _configuration.GetSection("Jwt:Audiences").Get<string[]>();

            if (string.IsNullOrEmpty(issuer))
            {
                throw new InvalidOperationException("JWT issuer is missing in the configuration.");
            }

            List<Claim> claims = new List<Claim>
            {
                new Claim("UserId", user.Id.ToString()),
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(tokenKey));
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: issuer,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddDays(14),
                signingCredentials: creds
            );

            token.Payload["aud"] = audiences;

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> Add(UserCreateDto dto)
        {
            try
            {
                UserDto result = await _userService.CreateUserAsync(dto);
                return CreateActionResult(CustomResponseDto<UserDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range"), Authorize]
        public async Task<IActionResult> AddRangeUsers(List<UserCreateDto> dtos)
        {
            try
            {
                List<UserDto> result = await _userService.CreateRangeUserAsync(dtos);
                return CreateActionResult(CustomResponseDto<List<UserDto>>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range"), Authorize]
        public async Task<IActionResult> DeleteRangeUsers(List<Guid> ids)
        {
            try
            {
                await _userService.DeleteRangeUserAsync(ids);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpGet("filter"), Authorize]
        public async Task<IActionResult> Filter([FromQuery] string? filter)
        {
            try
            {
                if (string.IsNullOrEmpty(filter))
                {
                    return await All();
                }
                List<UserDto> result = await _userService.FilterAllAsync(filter);
                return CreateActionResult(CustomResponseDto<List<UserDto>>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
