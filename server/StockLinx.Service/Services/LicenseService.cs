using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class LicenseService : Service<License>, ILicenseService
    {
        private readonly IMapper _mapper;
        public LicenseService(IRepository<License> repository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task CreateLicenseAsync(LicenseCreateDto createDto)
        {
            var newLicense = _mapper.Map<License>(createDto);
            newLicense.Id = Guid.NewGuid();
            await AddAsync(newLicense);
        }
        public Task UpdateLicenseAsync(LicenseUpdateDto updateDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteLicenseAsync(Guid licenseId)
        {
            throw new NotImplementedException();
        }

    }
}
