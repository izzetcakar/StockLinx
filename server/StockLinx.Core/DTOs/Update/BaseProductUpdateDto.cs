﻿namespace StockLinx.Core.DTOs.Update
{
    public abstract class BaseProductUpdateDto : BaseUpdateDto
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string? SerialNo { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public double? PurchaseCost { get; set; }
        public string? OrderNo { get; set; }
        public string? Notes { get; set; }
        public Guid? ImageId { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? LocationId { get; set; }
        public Guid? CompanyId { get; set; }
    }
}