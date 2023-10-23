﻿using StockLinx.Core.DTOs.Update;

namespace StockLinx.Core.DTOs.Generic
{
    public class ManufacturerDto : BaseUpdateDto
    {
        public Guid CompanyId { get; set; }
        public Guid BranchId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? URL { get; set; }
        public string? SupportURL { get; set; }
        public string? SupportPhone { get; set; }
        public string? SupportEmail { get; set; }
    }
}
