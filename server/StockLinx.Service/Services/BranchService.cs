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
    public class BranchService : Service<Branch>, IBranchService
    {
        private readonly IBranchRepository _branchRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public BranchService(
            IRepository<Branch> repository,
            IBranchRepository branchRepository,
            ICompanyRepository companyRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork,
            ICustomLogService customLogService
        )
            : base(repository, unitOfWork)
        {
            _branchRepository = branchRepository;
            _companyRepository = companyRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _customLogService = customLogService;
        }

        public async Task<BranchDto> GetDtoAsync(Guid id)
        {
            Branch branch = await GetByIdAsync(id);
            if (branch == null)
            {
                throw new Exception("Branch is not found");
            }
            return _branchRepository.GetDto(branch);
        }

        public async Task<List<BranchDto>> GetAllDtosAsync()
        {
            return await _branchRepository.GetAllDtos();
        }

        public async Task<BranchDto> CreateBranchAsync(BranchCreateDto dto)
        {
            Branch newBranch = _mapper.Map<Branch>(dto);
            Company company = await _companyRepository.GetByIdAsync(newBranch.CompanyId);
            newBranch.Id = Guid.NewGuid();
            newBranch.CreatedDate = DateTime.UtcNow;
            await _branchRepository.AddAsync(newBranch);
            await _customLogService.CreateCustomLog(
                "Create",
                "Branch",
                newBranch.Id,
                newBranch.Name,
                "Company",
                company.Id,
                company.Name
            );
            await _unitOfWork.CommitAsync();
            return _branchRepository.GetDto(newBranch);
        }

        public async Task<List<BranchDto>> CreateRangeBranchAsync(List<BranchCreateDto> dtos)
        {
            List<Branch> branches = new List<Branch>();
            foreach (BranchCreateDto dto in dtos)
            {
                Branch branch = _mapper.Map<Branch>(dto);
                Company company = await _companyRepository.GetByIdAsync(branch.CompanyId);
                branch.Id = Guid.NewGuid();
                branch.CreatedDate = DateTime.UtcNow;
                branches.Add(branch);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "Branch",
                    branch.Id,
                    branch.Name,
                    "Company",
                    company.Id,
                    company.Name
                );
            }
            await _branchRepository.AddRangeAsync(branches);
            await _unitOfWork.CommitAsync();
            return _branchRepository.GetDtos(branches);
        }

        public async Task<BranchDto> UpdateBranchAsync(BranchUpdateDto dto)
        {
            Branch branchInDb = await GetByIdAsync(dto.Id);
            if (branchInDb == null)
            {
                throw new Exception("Branch is not found");
            }
            Branch branch = _mapper.Map<Branch>(dto);
            branch.UpdatedDate = DateTime.UtcNow;
            _branchRepository.Update(branchInDb, branch);
            await _customLogService.CreateCustomLog("Update", "Branch", branch.Id, branch.Name);
            await _unitOfWork.CommitAsync();
            return _branchRepository.GetDto(branch);
        }

        public async Task DeleteBranchAsync(Guid id)
        {
            Branch branch = await GetByIdAsync(id);
            if (branch == null)
            {
                throw new Exception("Branch is not found");
            }
            bool canDelete = await _branchRepository.CanDeleteAsync(id);
            if (canDelete)
            {
                _branchRepository.Remove(branch);
                await _customLogService.CreateCustomLog("Delete", "Branch", branch.Id, branch.Name);
                await _unitOfWork.CommitAsync();
            }
        }

        public async Task DeleteRangeBranchAsync(List<Guid> ids)
        {
            List<Branch> branches = new List<Branch>();
            foreach (Guid id in ids)
            {
                Branch branch = await GetByIdAsync(id);
                if (branch == null)
                {
                    throw new Exception("Branch is not found");
                }
                bool canDelete = await _branchRepository.CanDeleteAsync(branch.Id);
                if (canDelete)
                {
                    branches.Add(branch);
                    await _customLogService.CreateCustomLog(
                        "Delete",
                        "Branch",
                        branch.Id,
                        branch.Name
                    );
                }
            }
            _branchRepository.RemoveRange(branches);
            await _unitOfWork.CommitAsync();
        }
    }
}
