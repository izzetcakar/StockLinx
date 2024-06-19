using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;
using StockLinx.Repository.Repositories.EF_Core;

namespace StockLinx.Service.Services
{
    public class CompanyService : Service<Company>, ICompanyService
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly IUserService _userService;
        private readonly ICustomLogService _customLogService;
        private readonly IFilterService<Company> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CompanyService(
            IRepository<Company> repository,
            ICompanyRepository companyRepository,
            IUserService userService,
            ICustomLogService customLogService,
            IFilterService<Company> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _companyRepository = companyRepository;
            _userService = userService;
            _customLogService = customLogService;
            _filterService = filterService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<CompanyDto> GetDtoAsync(Guid id)
        {
            Company company = await GetByIdAsync(id);
            return _companyRepository.GetDto(company);
        }

        public async Task<List<CompanyDto>> GetAllDtosAsync()
        {
            return await _companyRepository.GetAllDtosAsync();
        }

        public async Task<CompanyDto> CreateCompanyAsync(CompanyCreateDto dto)
        {
            await CheckTagExistAsync(dto.Tag);
            User user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new Exception("User is not admin");
            }
            Company company = _mapper.Map<Company>(dto);

            if (company.ImagePath != null)
            {
                if (company.ImagePath.Contains("base64,"))
                {
                    ImageUtils.UploadBase64AsJpg(company.ImagePath, $"{company.Id}", "Companies");
                    company.ImagePath = $"Companies/{company.Id}.jpg";
                }
            }

            await _companyRepository.AddAsync(company);
            await _customLogService.CreateCustomLog("Create", "Company", company.Id, company.Name);
            await _unitOfWork.CommitAsync();
            return _companyRepository.GetDto(company);
        }

        public async Task<List<CompanyDto>> CreateRangeCompanyAsync(List<CompanyCreateDto> dtos)
        {
            await CheckTagExistAsync(dtos.Select(d => d.Tag).ToList());
            User user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new Exception("User is not admin");
            }
            List<Company> companies = new List<Company>();
            foreach (CompanyCreateDto dto in dtos)
            {
                Company company = _mapper.Map<Company>(dto);
                companies.Add(company);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "Company",
                    company.Id,
                    company.Name
                );
            }
            await _companyRepository.AddRangeAsync(companies);
            await _unitOfWork.CommitAsync();
            return _companyRepository.GetDtos(companies);
        }

        public async Task<CompanyDto> UpdateCompanyAsync(CompanyUpdateDto dto)
        {
            User user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new Exception("User is not admin");
            }
            Company companyInDb = await GetByIdAsync(dto.Id);
            Company company = _mapper.Map<Company>(dto);
            company.UpdatedDate = DateTime.UtcNow;

            if (company.ImagePath != null)
            {
                if (company.ImagePath.Contains("base64,"))
                {
                    ImageUtils.UploadBase64AsJpg(company.ImagePath, $"{company.Id}", "Companies");
                    company.ImagePath = $"Companies/{company.Id}.jpg";
                }
            }

            _companyRepository.Update(companyInDb, company);
            await _customLogService.CreateCustomLog("Update", "Company", company.Id, company.Name);
            await _unitOfWork.CommitAsync();
            return _companyRepository.GetDto(company);
        }

        public async Task DeleteCompanyAsync(Guid id)
        {
            await _companyRepository.CanDeleteAsync(id);
            User user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new Exception("User is not admin");
            }
            Company company = await GetByIdAsync(id);
            await _customLogService.CreateCustomLog("Delete", "Company", company.Id, company.Name);
            _companyRepository.Remove(company);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeCompanyAsync(List<Guid> ids)
        {
            User user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new Exception("User is not admin");
            }
            List<Company> companies = new List<Company>();
            foreach (Guid id in ids)
            {
                await _companyRepository.CanDeleteAsync(id);
                Company company = await GetByIdAsync(id);
                companies.Add(company);
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "Company",
                    company.Id,
                    company.Name
                );
            }
            _companyRepository.RemoveRange(companies);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<CompanyDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return _companyRepository.GetDtos(result.ToList());
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
    }
}
