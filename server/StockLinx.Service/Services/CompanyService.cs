using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;
using static System.Net.Mime.MediaTypeNames;

namespace StockLinx.Service.Services
{
    public class CompanyService : Service<Company>, ICompanyService
    {
        private readonly IMapper _mapper;
        public CompanyService(IRepository<Company> repository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task CreateCompanyAsync(CompanyCreateDto createDto)
        {
            var newCompany = _mapper.Map<Company>(createDto);
            newCompany.Id = Guid.NewGuid();
            newCompany.CreatedDate = DateTime.UtcNow;

            //Check if newCompany.ImagePath is base64 or not and not null
            if (newCompany.ImagePath != null && newCompany.ImagePath.Contains("data:image/png;base64,"))
            {
                string base64 = newCompany.ImagePath.Substring(newCompany.ImagePath.IndexOf(',') + 1);
                string path = newCompany.Name + DateTime.Now.ToString("yyyyMMddHHmmss");
                ImageHandler.UploadBase64AsFile(base64, path);
            } 
            await AddAsync(newCompany);
        }
        public Task UpdateCompanyAsync(CompanyUpdateDto updateDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteCompanyAsync(Guid companyId)
        {
            throw new NotImplementedException();
        }

    }
}
