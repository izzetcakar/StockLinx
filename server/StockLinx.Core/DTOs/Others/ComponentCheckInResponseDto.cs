using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Others
{
    public class ComponentCheckInResponseDto
    {
        public ComponentDto Component { get; set; }
        public DeployedProductDto DeployedProduct { get; set; }
    }
}
