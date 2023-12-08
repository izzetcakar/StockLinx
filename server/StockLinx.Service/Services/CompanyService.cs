using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class CompanyService : Service<Company>, ICompanyService
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public CompanyService(IRepository<Company> repository, ICompanyRepository companyRepository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _companyRepository = companyRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<CompanyDto> GetDto(Guid id)
        {
            var company = await GetByIdAsync(id);
            return _companyRepository.GetDto(company);
        }

        public async Task<List<CompanyDto>> GetAllDtos()
        {
            return await _companyRepository.GetAllDtos();
        }

        public async Task<CompanyDto> CreateCompanyAsync(CompanyCreateDto createDto)
        {
            var newCompany = _mapper.Map<Company>(createDto);
            newCompany.Id = Guid.NewGuid();
            newCompany.CreatedDate = DateTime.UtcNow;
            var addedCompany = await AddAsync(newCompany);
            return _companyRepository.GetDto(addedCompany);
        }

        public async Task<List<CompanyDto>> CreateRangeCompanyAsync(List<CompanyCreateDto> createDtos)
        {
            var newCompanies = new List<Company>();
            foreach (var createDto in createDtos)
            {
                var newCompany = _mapper.Map<Company>(createDto);
                newCompany.Id = Guid.NewGuid();
                newCompany.CreatedDate = DateTime.UtcNow;
                newCompanies.Add(newCompany);
            }
            var addedCompanies = await AddRangeAsync(newCompanies);
            return _companyRepository.GetDtos(addedCompanies.ToList());
        }

        public async Task UpdateCompanyAsync(CompanyUpdateDto updateDto)
        {
            var companyInDb = await GetByIdAsync(updateDto.Id);
            if (companyInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the company to update is null.");
            }
            var updatedCompany = _mapper.Map<Company>(updateDto);
            updatedCompany.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(companyInDb, updatedCompany);
            var company = await GetByIdAsync(updateDto.Id);
            _companyRepository.GetDto(company);
        }

        public async Task DeleteCompanyAsync(Guid companyId)
        {
            if (companyId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(companyId), $"The ID of the company to delete is null.");
            }
            var company = await GetByIdAsync(companyId);
            if (company == null)
            {
                throw new ArgumentNullException(nameof(company), $"The company to delete is null.");
            }
            await RemoveAsync(company);
        }

        public async Task DeleteRangeCompanyAsync(List<Guid> companyIds)
        {
            var companies = new List<Company>();
            foreach (var companyId in companyIds)
            {
                var company = GetByIdAsync(companyId).Result;
                companies.Add(company);
            }
            await RemoveRangeAsync(companies);
        }
    }
}
