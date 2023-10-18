using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenericController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IAccessoryService _accessoryService;
        private readonly ILicenseService _licenseService;
        private readonly IConsumableService _consumableService;
        private readonly IAssetService _assetService;
        private readonly IComponentService _componentService;
        public GenericController(IMapper mapper, IAccessoryService accessoryService,
            IAssetService assetService, ILicenseService licenseService,
            IConsumableService consumableService, IComponentService componentService)
        {
            _mapper = mapper;
            _accessoryService = accessoryService;
            _licenseService = licenseService;
            _consumableService = consumableService;
            _assetService = assetService;
            _componentService = componentService;
        }

        [HttpGet("productCount")]
        public async Task<IActionResult> ProductCount()
        {
            var entityCounts = new List<ProductCounter>();
            var accessories = await _accessoryService.GetAllCountAsync();
            var licenses = await _licenseService.GetAllCountAsync();
            var consumables = await _consumableService.GetAllCountAsync();
            var assets = await _assetService.GetAllCountAsync();
            var components = await _componentService.GetAllCountAsync();
            entityCounts.Add(accessories);
            entityCounts.Add(licenses);
            entityCounts.Add(consumables);
            entityCounts.Add(assets);
            entityCounts.Add(components);
            return CreateActionResult(CustomResponseDto<List<ProductCounter>>.Success(200, entityCounts));
        }
        [HttpGet("productStatus")]
        public async Task<IActionResult> ProductStatusCount()
        {
            var productStatusCounts = new List<ProductStatusCounter>();
            var accessories = await _accessoryService.GetStatusCount();
            var licenses = await _licenseService.GetStatusCount();
            var consumables = await _consumableService.GetStatusCount();
            var assets = await _assetService.GetStatusCount();
            var components = await _componentService.GetStatusCount();

            productStatusCounts = accessories.Concat(licenses).Concat(consumables).Concat(assets).Concat(components).ToList();
            productStatusCounts = productStatusCounts.GroupBy(p => p.Status).Select(g => new ProductStatusCounter
            {
                Status = g.Key,
                Count = g.Sum(p => p.Count)
            }).ToList();

            //foreach (var item in Enum.GetValues(typeof(ProductStatus)))
            //{
            //    if (!productStatusCounts.Any(p => p.Status == item.ToString()))
            //    {
            //        productStatusCounts.Add(new ProductStatusCounter { Status = item.ToString(), Count = 0 });
            //    }
            //}

            return CreateActionResult(CustomResponseDto<List<ProductStatusCounter>>.Success(200, productStatusCounts));
        }
    }
}
