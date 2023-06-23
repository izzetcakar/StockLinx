using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ImageService : Service<Image>, IImageService
    {
        private readonly IImageRepository _imageRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ImageService(IRepository<Image> repository, IUnitOfWork unitOfWork, IImageRepository imageRepository, IMapper mapper) : base(repository, unitOfWork)
        {
            _imageRepository = imageRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task AddImageAsync(ImageCreateDto imageCreateDto)
        {
            Guid newId = Guid.NewGuid();
            string path = newId + "-" + imageCreateDto.FileName;
            string base64 = imageCreateDto.Base64Image.Substring(imageCreateDto.Base64Image.IndexOf(',') + 1);
            ImageHandler.UploadBase64AsFile(base64, path);
            var newImage = new Image { Id = newId, Path = path, CreatedDate = DateTime.UtcNow };
            await AddAsync(newImage);
            await _unitOfWork.CommitAsync();
        }
        public Task UpdateImageAsync(ImageUpdateDto updateDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteImageAsync(Guid imageId)
        {
            throw new NotImplementedException();
        }

    }
}
