﻿namespace StockLinx.Core.DTOs.Update
{
    public class DeployedProductUpdateDto : BaseUpdateDto
    {
        public Guid UserId { get; set; }
        public Guid? AccessoryId { get; set; }
        public Guid? AssetId { get; set; }
        public Guid? ComponentId { get; set; }
        public Guid? ConsumableId { get; set; }
        public Guid? LicenseId { get; set; }
        public DateTime AssignDate { get; set; }
        public string? Notes { get; set; }
    }
}
