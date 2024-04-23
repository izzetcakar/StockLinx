using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ManufacturerRepository : Repository<Manufacturer>, IManufacturerRepository
    {
        private readonly IMapper _mapper;
        public ManufacturerRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }
        public async Task<List<ManufacturerDto>> GetManufacturersPagedAsync(int skip, int take)
        {
            var manufacturers = await dbContext.Manufacturers
                .Skip(skip)
                .Take(take)
                .ToListAsync();
            return GetDtos(manufacturers.ToList());
        }
        public async Task<List<ManufacturerDto>> GetManufacturersPagedAsync(int skip, int take, Dictionary<string, string> filters)
        {
            var query = dbContext.Manufacturers.AsQueryable();

            if (filters != null && filters.Count > 0)
            {
                query = ApplyFilters(query, filters);
            }

            var manufacturers = await query
                .Skip(skip)
                .Take(take)
                .ToListAsync();

            return GetDtos(manufacturers);
        }
        private IQueryable<Manufacturer> ApplyFilters(IQueryable<Manufacturer> query, Dictionary<string, string> filters)
        {
            foreach (var filter in filters)
            {
                string propertyName = filter.Key;
                string filterValue = filter.Value;

                var parts = filterValue.Split(' ');
                if (parts.Length == 2)
                {
                    var filterOperator = parts[0];
                    var value = parts[1].ToString().ToLower();
                    Type propType = typeof(Manufacturer).GetProperty(propertyName).PropertyType;

                    switch (filterOperator)
                    {
                        case "contains":
                            //EF.Property<string>(m, propertyName)
                            query = query.Where(m => propType.GetProperty(propertyName).GetValue(m).ToString().ToLower().Contains(value));
                            break;
                        case "startswith":
                            query = query.Where(m => propType.GetProperty(propertyName).GetValue(m).ToString().StartsWith(value));
                            break;
                        case "endswith":
                            query = query.Where(m => propType.GetProperty(propertyName).GetValue(m).ToString().EndsWith(value));
                            break;
                        case "equals":
                            query = query.Where(m => propType.GetProperty(propertyName).GetValue(m).ToString() == value);
                            break;
                        case "startsdate":
                            query = query.Where(m => DateTime.Parse(propType.GetProperty(propertyName).GetValue(m).ToString()) >= DateTime.Parse(value));
                            break;
                        case "endsdate":
                            query = query.Where(m => DateTime.Parse(propType.GetProperty(propertyName).GetValue(m).ToString()) <= DateTime.Parse(value));
                            break;
                        default:
                            break;
                    }
                }
            }
            return query;
        }

        public ManufacturerDto GetDto(Manufacturer entity)
        {
            return _mapper.Map<ManufacturerDto>(entity);
        }
        public List<ManufacturerDto> GetDtos(List<Manufacturer> entities)
        {
            var dtos = new List<ManufacturerDto>();
            dtos = _mapper.Map<List<ManufacturerDto>>(entities);
            return dtos;
        }
        public async Task<List<ManufacturerDto>> GetAllDtos()
        {
            var entities = await dbContext.Manufacturers.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
