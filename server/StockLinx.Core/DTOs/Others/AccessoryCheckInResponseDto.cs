using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Others
{
    public class AccessoryCheckInResponseDto
    {
        public AccessoryDto Accessory { get; set; }
        public DeployedProductDto DeployedProduct { get; set; }
    }
}
