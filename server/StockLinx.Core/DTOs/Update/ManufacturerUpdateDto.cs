﻿namespace StockLinx.Core.DTOs.Update
{
    public class ManufacturerUpdateDto : BaseProductUpdateDto
    {
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? Website { get; set; }
        public string? SupportPhone { get; set; }
        public string? SupportEmail { get; set; }
    }
}
