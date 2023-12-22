using AutoMapper;
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
using System.Text;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public UserController(IMapper mapper, IUserService userservice, IConfiguration configuration)
        {
            _mapper = mapper;
            _userService = userservice;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                var userDtos = await _userService.GetAllDtos();
                return CreateActionResult(CustomResponseDto<List<UserDto>>.Success(200, userDtos));
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
                var userDto = await _userService.GetDto(id);
                return CreateActionResult(CustomResponseDto<UserDto>.Success(200, userDto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
        [HttpPut]
        public async Task<IActionResult> Update(UserUpdateDto updateDto)
        {
            try
            {
                var dto = await _userService.UpdateUserAsync(updateDto);
                return CreateActionResult(CustomResponseDto<UserDto>.Success(200, dto));
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
                await _userService.DeleteUserAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto userLoginDto)
        {
            try
            {
                var user = await _userService.Login(userLoginDto);
                if (user != null)
                {
                    TokenDto token = new TokenDto();
                    token.Token = CreateToken(user);
                    return CreateActionResult(CustomResponseDto<TokenDto>.Success(200, token));
                }
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, "User is not found"));
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
                var user = await _userService.GetCurrentUser();
                if (user != null)
                {
                    var userDto = _mapper.Map<UserDto>(user);
                    return CreateActionResult(CustomResponseDto<UserDto>.Success(200, userDto));
                }
                else
                {
                    return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(404, "User is not found"));
                }
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
        private string CreateToken(User user)
        {
            var claims = new List<Claim>
    {
        new Claim("UserId", user.Id.ToString())
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AppSettings:Token"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(14),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        [HttpPost]
        public async Task<IActionResult> Add(UserCreateDto createDto)
        {
            try
            {
                var added = await _userService.CreateUserAsync(createDto);
                return CreateActionResult(CustomResponseDto<UserDto>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
        [HttpPost("range")]
        public async Task<IActionResult> AddRangeUsers(List<UserCreateDto> createDtos)
        {
            try
            {
                var added = await _userService.CreateRangeUserAsync(createDtos);
                return CreateActionResult(CustomResponseDto<List<UserDto>>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeUsers(List<Guid> userIds)
        {
            try
            {
                await _userService.DeleteRangeUserAsync(userIds);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
