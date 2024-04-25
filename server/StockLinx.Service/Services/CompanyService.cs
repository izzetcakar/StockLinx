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
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CompanyService(
            IRepository<Company> repository,
            ICompanyRepository companyRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ICustomLogService customLogService,
            IUserService userService
        )
            : base(repository, unitOfWork)
        {
            _companyRepository = companyRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _customLogService = customLogService;
            _userService = userService;
        }

        public async Task<CompanyDto> GetDtoAsync(Guid id)
        {
            Company company = await GetByIdAsync(id);
            if (company == null)
            {
                throw new Exception("Company is not found");
            }
            return _companyRepository.GetDto(company);
        }

        public async Task<List<CompanyDto>> GetAllDtosAsync()
        {
            return await _companyRepository.GetAllDtosAsync();
        }

        public async Task<CompanyDto> CreateCompanyAsync(CompanyCreateDto dto)
        {
            User user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new Exception("User is not admin");
            }
            Company company = _mapper.Map<Company>(dto);
            company.Id = Guid.NewGuid();
            company.CreatedDate = DateTime.UtcNow;

            if (company.ImagePath != null)
            {
                if (company.ImagePath.Contains("base64,"))
                {
                    ImageHandler.UploadBase64AsJpg(company.ImagePath, $"{company.Id}", "Companies");
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
            User user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new Exception("User is not admin");
            }
            List<Company> companies = new List<Company>();
            foreach (CompanyCreateDto dto in dtos)
            {
                Company company = _mapper.Map<Company>(dto);
                company.Id = Guid.NewGuid();
                company.CreatedDate = DateTime.UtcNow;
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
            if (companyInDb == null)
            {
                throw new Exception("Company is not found");
            }
            Company company = _mapper.Map<Company>(dto);
            company.UpdatedDate = DateTime.UtcNow;

            if (company.ImagePath != null)
            {
                if (company.ImagePath.Contains("base64,"))
                {
                    ImageHandler.UploadBase64AsJpg(company.ImagePath, $"{company.Id}", "Companies");
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
            User user = await _userService.GetCurrentUser();
            if ((bool)!user.IsAdmin)
            {
                throw new Exception("User is not admin");
            }
            Company company = await GetByIdAsync(id);
            if (company == null)
            {
                throw new Exception("Company is not found");
            }
            bool canDelete = await _companyRepository.CanDeleteAsync(id);
            if (canDelete)
            {
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "Company",
                    company.Id,
                    company.Name
                );
                _companyRepository.Remove(company);
                await _unitOfWork.CommitAsync();
            }
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
                Company company = await GetByIdAsync(id);
                if (company == null)
                {
                    throw new Exception("Company is not found");
                }
                bool canDelete = await _companyRepository.CanDeleteAsync(id);
                if (canDelete)
                {
                    companies.Add(company);
                    await _customLogService.CreateCustomLog(
                        "Delete",
                        "Company",
                        company.Id,
                        company.Name
                    );
                }
            }
            _companyRepository.RemoveRange(companies);
            await _unitOfWork.CommitAsync();
        }
    }
}
