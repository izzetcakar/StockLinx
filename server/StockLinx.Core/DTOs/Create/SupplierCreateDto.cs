﻿namespace StockLinx.Core.DTOs.Create
{
    public class SupplierCreateDto : BaseCreateDto
    {
        public Guid? LocationId { get; set; }
        public string Name { get; set; }
        public string? ContactName { get; set; }
        public string? ContactPhone { get; set; }
        public string? ContactEmail { get; set; }
        public string? Website { get; set; }
        public string? Fax { get; set; }
        public string? Notes { get; set; }
    }
}
