using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class CompanyService : Service<Company>, ICompanyService
    {
        private readonly IMapper _mapper;
        public CompanyService(IRepository<Company> repository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task CreateCompanyAsync(CompanyCreateDto createDto)
        {
            var newCompany = _mapper.Map<Company>(createDto);
            newCompany.Id = Guid.NewGuid();
            await AddAsync(newCompany);
        }
        public Task UpdateCompanyAsync(CompanyUpdateDto updateDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteCompanyAsync(Guid companyId)
        {
            throw new NotImplementedException();
        }

    }
}
