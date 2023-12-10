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
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public BranchService(IRepository<Branch> repository, IBranchRepository branchRepository,
            IMapper mapper, IUnitOfWork unitOfWork, ICustomLogService customLogService) : base(repository, unitOfWork)
        {
            _branchRepository = branchRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _customLogService = customLogService;
        }

        public async Task<BranchDto> GetDto(Guid id)
        {
            var branch = await GetByIdAsync(id);
            return _branchRepository.GetDto(branch);
        }

        public async Task<List<BranchDto>> GetAllDtos()
        {
            return await _branchRepository.GetAllDtos();
        }

        public async Task<BranchDto> CreateBranchAsync(BranchCreateDto createDto)
        {
            var newBranch = _mapper.Map<Branch>(createDto);
            newBranch.Id = Guid.NewGuid();
            newBranch.CreatedDate = DateTime.UtcNow;
            await _branchRepository.AddAsync(newBranch);
            await _customLogService.CreateCustomLog("Create", newBranch.Id, newBranch.CompanyId, "Branch", "Company");
            await _unitOfWork.CommitAsync();
            return _branchRepository.GetDto(newBranch);
        }

        public async Task<List<BranchDto>> CreateRangeBranchAsync(List<BranchCreateDto> createDtos)
        {
            var newBranches = new List<Branch>();
            foreach (var createDto in createDtos)
            {
                var newBranch = _mapper.Map<Branch>(createDto);
                newBranch.Id = Guid.NewGuid();
                newBranch.CreatedDate = DateTime.UtcNow;
                newBranches.Add(newBranch);
                await _customLogService.CreateCustomLog("Create", newBranch.Id, newBranch.CompanyId, "Branch", "Company");
            }
            await _branchRepository.AddRangeAsync(newBranches);
            await _unitOfWork.CommitAsync();
            return _branchRepository.GetDtos(newBranches.ToList());
        }

        public async Task<BranchDto> UpdateBranchAsync(BranchUpdateDto updateDto)
        {
            var branchInDb = await GetByIdAsync(updateDto.Id);
            if (branchInDb == null)
            {
                throw new ArgumentNullException("Branch is not found");
            }
            var updatedBranch = _mapper.Map<Branch>(updateDto);
            updatedBranch.UpdatedDate = DateTime.UtcNow;
            _branchRepository.Update(branchInDb, updatedBranch);
            await _customLogService.CreateCustomLog("Update", updatedBranch.Id, updatedBranch.CompanyId, "Branch", "Company");
            var branch = await GetByIdAsync(updateDto.Id);
            await _unitOfWork.CommitAsync();
            return _branchRepository.GetDto(branch);
        }

        public async Task DeleteBranchAsync(Guid branchId)
        {
            var branch = await GetByIdAsync(branchId);
            if (branch == null)
            {
                throw new ArgumentNullException("Branch is not found");
            }
            branch.DeletedDate = DateTime.UtcNow;
            _branchRepository.Update(branch, branch);
            await _customLogService.CreateCustomLog("Delete", branch.Id, branch.CompanyId, "Branch", "Company");
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeBranchAsync(List<Guid> branchIds)
        {
            var branches = new List<Branch>();
            foreach (var branchId in branchIds)
            {
                var branch = await GetByIdAsync(branchId);
                branch.DeletedDate = DateTime.UtcNow;
                branches.Add(branch);
                await _customLogService.CreateCustomLog("Delete", branch.Id, branch.CompanyId, "Branch", "Company");
            }
            _branchRepository.UpdateRange(branches);
            await _unitOfWork.CommitAsync();
        }
    }
}
