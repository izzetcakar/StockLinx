﻿using AutoMapper;
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
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBranchRepository _branchRepository;
        public BranchService(IRepository<Branch> repository, IBranchRepository branchRepository,
            IMapper mapper, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
            _branchRepository = branchRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<BranchDto>> GetAllBranchDtos()
        {
            return await _branchRepository.GetAllBranchDtos();
        }
        public async Task<BranchDto> CreateBranchAsync(BranchCreateDto createDto)
        {
            var newBranch = _mapper.Map<Branch>(createDto);
            newBranch.Id = Guid.NewGuid();
            newBranch.CreatedDate = DateTime.UtcNow;
            var addedBranch = await AddAsync(newBranch);
            return _branchRepository.GetBranchDto(addedBranch);
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
            }
            var addedBranches = await AddRangeAsync(newBranches);
            return _branchRepository.GetBranchDtos(addedBranches.ToList());
        }

        public async Task UpdateBranchAsync(BranchUpdateDto updateDto)
        {
            var branchInDb = await GetByIdAsync(updateDto.Id);
            if (branchInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the branch to update is null.");
            }
            var updatedBranch = _mapper.Map<Branch>(updateDto);
            updatedBranch.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(branchInDb, updatedBranch);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteBranchAsync(Guid branchId)
        {
            if (branchId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(branchId), $"The ID of the branch to delete is null.");
            }
            var branch = await GetByIdAsync(branchId);
            if (branch == null)
            {
                throw new ArgumentNullException(nameof(branch), $"The branch to delete is null.");
            }
            await RemoveAsync(branch);
        }

        public async Task DeleteRangeBranchAsync(List<Guid> branchIds)
        {
            var branches = new List<Branch>();
            foreach (var branchId in branchIds)
            {
                var branch = GetByIdAsync(branchId).Result;
                branches.Add(branch);
            }
            await RemoveRangeAsync(branches);
        }
    }
}
