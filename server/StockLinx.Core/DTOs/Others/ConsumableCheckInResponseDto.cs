using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Others
{
    public class ConsumableCheckInResponseDto
    {
        public ConsumableDto Consumable { get; set; }
        public DeployedProductDto DeployedProduct { get; set; }
    }
}
