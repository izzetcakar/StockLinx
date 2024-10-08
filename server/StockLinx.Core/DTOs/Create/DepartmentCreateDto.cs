﻿namespace StockLinx.Core.DTOs.Create
{
    public class DepartmentCreateDto : BaseCreateDto
    {
        public Guid CompanyId { get; init; }
        public Guid? LocationId { get; set; }
        public Guid? ManagerId { get; set; }
        public string Name { get; set; }
        public string? Notes { get; set; }
    }
}
