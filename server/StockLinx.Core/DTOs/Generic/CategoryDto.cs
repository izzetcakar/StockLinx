﻿using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Generic
{
    public class CategoryDto : BaseDto
    {
        public Guid CompanyId { get; set; }
        public Guid BranchId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public CategoryType Type { get; set; }
    }
}
