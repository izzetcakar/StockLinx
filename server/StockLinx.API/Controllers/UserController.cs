using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public UserController(IMapper mapper, IUserService userService)
        {
            _mapper = mapper;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var users = await _userService.GetAllAsync();
            return CreateActionResult(CustomResponseDto<List<User>>.Success(200, users.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var user = await _userService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<User>.Success(200, user));
        }

        [HttpPost]
        public async Task<IActionResult> Add(UserCreateDto userCreateDto)
        {
            var newUser = _mapper.Map<User>(userCreateDto);
            newUser.Id = Guid.NewGuid();
            newUser.IsAdmin = false;
            await _userService.AddAsync(newUser);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
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
    }
}
