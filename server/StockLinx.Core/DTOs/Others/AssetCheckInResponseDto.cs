using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Others
{
    public class AssetCheckInResponseDto
    {
        public AssetDto Asset { get; set; }
        public DeployedProductDto DeployedProduct { get; set; }
    }
}
