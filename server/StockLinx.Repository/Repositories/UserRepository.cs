using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly IMapper _mapper;

        public UserRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public UserDto GetDto(User entity)
        {
            return _mapper.Map<UserDto>(entity);
        }

        public List<UserDto> GetDtos(IEnumerable<User> entities)
        {
            var dtos = new List<UserDto>();
            foreach (var entity in entities)
            {
                var dto = GetDto(entity);
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<List<UserDto>> GetAllDtosAsync()
        {
            List<User> entities = await dbContext.Users.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
