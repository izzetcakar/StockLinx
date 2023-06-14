﻿using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Models;

namespace StockLinx.Core.Services
{
    public interface IUserService : IService<User>
    {
        Task<User> Login(UserLoginDto userLoginDto);
        Task Logout();
        Task<User> Register(User user);
        string GetMyName();
    }
}
