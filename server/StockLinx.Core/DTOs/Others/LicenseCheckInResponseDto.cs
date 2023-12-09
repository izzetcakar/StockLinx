using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Others
{
    public class LicenseCheckInResponseDto
    {
        public LicenseDto License { get; set; }
        public DeployedProductDto DeployedProduct { get; set; }
    }
}
