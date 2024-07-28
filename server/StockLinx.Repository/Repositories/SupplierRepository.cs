using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class SupplierRepository : Repository<Supplier>, ISupplierRepository
    {
        private readonly IMapper _mapper;

        public SupplierRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
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

        public async Task<List<SupplierDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.Suppliers.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }

        public async Task<List<SupplierDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            var query = dbContext
                .Suppliers.Where(d => ids.Contains(d.Id))
                .Select(d => new SupplierDisplayDto
                {
                    Name = d.Name,
                    Location = d.Location.Name,
                    ContactName = d.ContactName,
                    ContactEmail = d.ContactEmail,
                    ContactPhone = d.ContactPhone,
                    Fax = d.Fax,
                    Website = d.Website,
                    Notes = d.Notes
                });
            return await query.ToListAsync();
        }
    }
}
