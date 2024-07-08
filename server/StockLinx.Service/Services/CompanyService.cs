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
        private readonly IUserService _userService;
        private readonly IPermissionService _permissionService;
        private readonly IFilterService<Company> _filterService;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CompanyService(
            IRepository<Company> repository,
            ICompanyRepository companyRepository,
            IUserService userService,
            IPermissionService permissionService,
            IFilterService<Company> filterService,
            ICustomLogService customLogService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _companyRepository = companyRepository;
            _userService = userService;
            _permissionService = permissionService;
            _filterService = filterService;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<CompanyDto> GetDtoAsync(Guid id)
        {
            await _permissionService.VerifyCompanyAccessAsync(id);
            Company company = await GetByIdAsync(id);
            return _companyRepository.GetDto(company);
        }

        public async Task<List<CompanyDto>> GetAllDtosAsync()
        {
            var list = await _companyRepository.GetAllDtosAsync();
            List<Guid> companyIds = await _permissionService.GetCompanyIdsAsync();
            return list.Where(d => companyIds.Contains(d.Id)).ToList();
        }

        public async Task<CompanyDto> CreateCompanyAsync(CompanyCreateDto dto)
        {
            await CheckTagExistAsync(dto.Tag);
            bool isAdmin = await _userService.CheckCurrentUserAdmin();
            if (!isAdmin)
            {
                throw new Exception("User is not admin");
            }
            Company company = _mapper.Map<Company>(dto);

            await _companyRepository.AddAsync(company);
            await CreateCheckLogAsync("Create", company);
            await _unitOfWork.CommitAsync();
            return _companyRepository.GetDto(company);
        }

        public async Task<List<CompanyDto>> CreateRangeCompanyAsync(List<CompanyCreateDto> dtos)
        {
            await CheckTagExistAsync(dtos.Select(d => d.Tag).ToList());
            bool isAdmin = await _userService.CheckCurrentUserAdmin();
            if (!isAdmin)
            {
                throw new Exception("User is not admin");
            }
            List<Company> companies = new List<Company>();
            foreach (CompanyCreateDto dto in dtos)
            {
                Company company = _mapper.Map<Company>(dto);
                companies.Add(company);
                await CreateCheckLogAsync("Create", company);
            }
            await _companyRepository.AddRangeAsync(companies);
            await _unitOfWork.CommitAsync();
            return _companyRepository.GetDtos(companies);
        }

        public async Task<CompanyDto> UpdateCompanyAsync(CompanyUpdateDto dto)
        {
            await _permissionService.VerifyCompanyAccessAsync(dto.Id);
            Company companyInDb = await GetByIdAsync(dto.Id);
            Company company = _mapper.Map<Company>(dto);
            company.UpdatedDate = DateTime.UtcNow;
            _companyRepository.Update(companyInDb, company);
            await CreateCheckLogAsync("Update", company);
            await _unitOfWork.CommitAsync();
            return _companyRepository.GetDto(company);
        }

        public async Task DeleteCompanyAsync(Guid id)
        {
            await _permissionService.VerifyCompanyAccessAsync(id);
            await _companyRepository.CanDeleteAsync(id);
            User user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new Exception("User is not admin");
            }
            Company company = await GetByIdAsync(id);
            await CreateCheckLogAsync("Delete", company);
            _companyRepository.Remove(company);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeCompanyAsync(List<Guid> ids)
        {
            List<Company> companies = new List<Company>();
            foreach (Guid id in ids)
            {
                await _permissionService.VerifyCompanyAccessAsync(id);
                await _companyRepository.CanDeleteAsync(id);
                Company company = await GetByIdAsync(id);
                companies.Add(company);
                await CreateCheckLogAsync("Delete", company);
            }
            _companyRepository.RemoveRange(companies);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<CompanyDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            var list = _companyRepository.GetDtos(result.ToList());
            List<Guid> companyIds = await _permissionService.GetCompanyIdsAsync();
            return list.Where(d => companyIds.Contains(d.Id)).ToList();
        }

        public async Task CheckTagExistAsync(string tag)
        {
            tag = TagUtils.Check(tag);
            bool isExist = await AnyAsync(d => d.Tag == tag);
            if (isExist)
            {
                throw new Exception($"Tag {tag} already exist.");
            }
        }

        public async Task CheckTagExistAsync(List<string> tags)
        {
            tags = TagUtils.Check(tags);
            var existingTags = await Where(d => tags.Contains(d.Tag));
            if (existingTags.Count() > 0)
            {
                var existingTagNames = existingTags.Select(x => x.Tag).ToList();
                throw new Exception($"Tags {string.Join("\n", existingTagNames)} already exist.");
            }
        }

        public async Task CreateCheckLogAsync(string action, Company company)
        {
            await _customLogService.CreateCustomLog(action, "Company", company.Id, company.Name);
        }
    }
}
