using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class SupplierRepository : Repository<Supplier>, ISupplierRepository
    {
        private readonly IMapper _mapper;
        public SupplierRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public SupplierDto GetDto(Supplier entity)
        {
            return _mapper.Map<SupplierDto>(entity);
        }
        public List<SupplierDto> GetDtos(List<Supplier> entities)
        {
            var dtos = new List<SupplierDto>();
            dtos = _mapper.Map<List<SupplierDto>>(entities);
            return dtos;
        }
        public async Task<List<SupplierDto>> GetAllDtos()
        {
            var entities = await dbContext.Suppliers.Where(s => s.DeletedDate == null).AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
