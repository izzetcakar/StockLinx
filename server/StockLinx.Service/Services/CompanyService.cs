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
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public CompanyService(IRepository<Company> repository, ICompanyRepository companyRepository, IUnitOfWork unitOfWork,
            IMapper mapper, ICustomLogService customLogService) : base(repository, unitOfWork)
        {
            _companyRepository = companyRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _customLogService = customLogService;
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
            await _companyRepository.AddAsync(newCompany);
            await _customLogService.CreateCustomLog("Create", newCompany.Id, null, "Company", null);
            await _unitOfWork.CommitAsync();
            return _companyRepository.GetDto(newCompany);
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
                await _customLogService.CreateCustomLog("Create", newCompany.Id, null, "Company", null);
            }
            await _companyRepository.AddRangeAsync(newCompanies);
            await _unitOfWork.CommitAsync();
            return _companyRepository.GetDtos(newCompanies.ToList());
        }

        public async Task<CompanyDto> UpdateCompanyAsync(CompanyUpdateDto updateDto)
        {
            var companyInDb = await GetByIdAsync(updateDto.Id);
            if (companyInDb == null)
            {
                throw new ArgumentNullException("Company is not found");
            }
            var updatedCompany = _mapper.Map<Company>(updateDto);
            updatedCompany.UpdatedDate = DateTime.UtcNow;
            _companyRepository.Update(companyInDb, updatedCompany);
            await _customLogService.CreateCustomLog("Update", updatedCompany.Id, null, "Company", null);
            await _unitOfWork.CommitAsync();
            return _companyRepository.GetDto(updatedCompany);
        }

        public async Task DeleteCompanyAsync(Guid companyId)
        {
            var company = await GetByIdAsync(companyId);
            if (company == null)
            {
                throw new ArgumentNullException("Company is not found");
            }
            company.UpdatedDate = DateTime.UtcNow;
            _companyRepository.Update(company, company);
            await _customLogService.CreateCustomLog("Delete", company.Id, null, "Company", null);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeCompanyAsync(List<Guid> companyIds)
        {
            var companies = new List<Company>();
            foreach (var companyId in companyIds)
            {
                var company = await GetByIdAsync(companyId);
                company.DeletedDate = DateTime.UtcNow;
                companies.Add(company);
                await _customLogService.CreateCustomLog("Delete", company.Id, null, "Company", null);
            }
            _companyRepository.UpdateRange(companies);
            await _unitOfWork.CommitAsync();
        }
    }
}
