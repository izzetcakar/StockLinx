﻿namespace StockLinx.Core.DTOs.Update
{
    public abstract class BaseProductUpdateDto : BaseUpdateDto
    {
        public Guid CompanyId { get; set; }
        public Guid? SupplierId { get; set; }
        public string Tag { get; init; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? OrderNo { get; set; }
        public string? Notes { get; set; }
        public double? PurchaseCost { get; set; }
        public DateTime? PurchaseDate { get; set; }
    }
}
