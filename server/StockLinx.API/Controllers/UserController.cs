using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
            var users = await _userService.GetAllAsync();
            var userDtos = _mapper.Map<List<UserDto>>(users).ToList();
            return CreateActionResult(CustomResponseDto<List<UserDto>>.Success(200, userDtos));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var user = await _userService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<User>.Success(200, user));
        }

        [HttpPut]
        public async Task<IActionResult> Update(UserDto userDto)
        {
            // Update
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
            var newUser = _mapper.Map<User>(userDto);
            newUser.Id = Guid.NewGuid();
            newUser.IsAdmin = false;
            try
            {
                var user = await _userService.Register(newUser);
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
            var user = _userService.GetCurrentUser();
            if (user != null)
            {
                return CreateActionResult(CustomResponseDto<UserDto>.Success(200, _mapper.Map<UserDto>(user)));
            }
            else
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(404, "User is not found"));
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
    }
}
