using AutoMapper;
using Microsoft.Extensions.Logging;
using StockLinx.Core.DTOs.Create;
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

        public async Task CreateBranchAsync(BranchCreateDto createDto)
        {
            var newBranch = _mapper.Map<Branch>(createDto);
            newBranch.Id = Guid.NewGuid();
            newBranch.CreatedDate = DateTime.UtcNow;

            await AddAsync(newBranch);
        }
        public async Task UpdateBranchAsync(BranchUpdateDto updateDto)
        {
            var BranchInDb = await GetByIdAsync(updateDto.Id);
            if (BranchInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the Branch to update is null.");
            }
            var updatedBranch = _mapper.Map<Branch>(updateDto);
            updatedBranch.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(BranchInDb, updatedBranch);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteBranchAsync(Guid BranchId)
        {
            if (BranchId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(BranchId), "The ID of the Branch to delete is null.");
            }
            var Branch = await GetByIdAsync(BranchId);
            if (Branch == null)
            {
                throw new ArgumentNullException(nameof(Branch), "The Branch to delete is null.");
            }
            await RemoveAsync(Branch);
        }
    }
}
