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

        public SupplierDto GetSupplierDto(Supplier supplier)
        {
            var supplierDto = _mapper.Map<SupplierDto>(supplier);
            return supplierDto;
        }
        public List<SupplierDto> GetSupplierDtos(List<Supplier> suppliers)
        {
            var supplierDtos = new List<SupplierDto>();
            supplierDtos = _mapper.Map<List<SupplierDto>>(suppliers);
            return supplierDtos;
        }
        public async Task<List<SupplierDto>> GetAllSupplierDtos()
        {
            var suppliers = await dbContext.Suppliers.AsNoTracking().ToListAsync();
            return GetSupplierDtos(suppliers);
        }
    }
}
