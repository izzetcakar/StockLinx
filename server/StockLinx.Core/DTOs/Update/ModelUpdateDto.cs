﻿using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Update
{
    public class ModelUpdateDto : BaseUpdateDto
    {
        public Guid? CategoryId { get; set; }
        public Guid? ManufacturerId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? ModelNo { get; set; }
        public string? Notes { get; set; }
    }
}
