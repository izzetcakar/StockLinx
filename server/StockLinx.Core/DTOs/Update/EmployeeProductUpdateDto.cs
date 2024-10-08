﻿namespace StockLinx.Core.DTOs.Update
{
    public class EmployeeProductUpdateDto : BaseUpdateDto
    {
        public Guid EmployeeId { get; set; }
        public Guid? AccessoryId { get; set; }
        public Guid? AssetId { get; set; }
        public Guid? ConsumableId { get; set; }
        public Guid? LicenseId { get; set; }
        public DateTime AssignDate { get; set; }
        public string? Notes { get; set; }
        public int Quantity { get; set; }
    }
}
