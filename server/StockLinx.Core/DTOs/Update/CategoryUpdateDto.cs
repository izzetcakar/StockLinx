﻿using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Update
{
    public class CategoryUpdateDto : BaseUpdateDto
    {
        public string Name { get; set; }
        public CategoryType Type { get; set; }
    }
}
