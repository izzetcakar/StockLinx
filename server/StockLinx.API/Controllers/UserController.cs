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
            var userDtos = await _userService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<UserDto>>.Success(200, userDtos));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var userDto = await _userService.GetDto(id);
            return CreateActionResult(CustomResponseDto<UserDto>.Success(200, userDto));
        }
        [HttpPut]
        public async Task<IActionResult> Update(UserUpdateDto updateDto)
        {
            await _userService.UpdateUserAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var user = await _userService.GetByIdAsync(id);
            await _userService.RemoveAsync(user);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
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
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserCreateDto userDto)
        {
            try
            {
                var user = await _userService.Register(userDto);
                if (user != null)
                {
                    TokenDto token = new TokenDto();
                    token.Token = CreateToken(user);
                    return CreateActionResult(CustomResponseDto<TokenDto>.Success(200, token));
                }
                else
                {
                    return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, "User is not valid"));
                }
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
            List<Claim> claims = new List<Claim>
            {
                new Claim("UserId", user.Id.ToString()),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(14),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        [HttpPost]
        public async Task<IActionResult> Add(UserCreateDto createDto)
        {
            var added = await _userService.CreateUserAsync(createDto);
            return CreateActionResult(CustomResponseDto<UserDto>.Success(201, added));
        }
        [HttpPost("range")]
        public async Task<IActionResult> AddRangeUsers(List<UserCreateDto> createDtos)
        {
            var added = await _userService.CreateRangeUserAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<UserDto>>.Success(201, added));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeUsers(List<Guid> userIds)
        {
            await _userService.DeleteRangeUserAsync(userIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
