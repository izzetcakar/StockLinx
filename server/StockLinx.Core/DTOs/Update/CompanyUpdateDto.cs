﻿namespace StockLinx.Core.DTOs.Update
{
    public class CompanyUpdateDto : BaseUpdateDto
    {
        public Guid? LocationId { get; set; }
        public string Tag { get; set; }
        public string Name { get; set; }
        public string? Email { get; set; }
    }
}
