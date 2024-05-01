﻿namespace StockLinx.Core.DTOs.Generic
{
    public class UserProductDto : BaseDto
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public DateTime AssignDate { get; set; }
        public string ProductName { get; set; }
        public string ProductType { get; set; }
        public string ProductRoute { get; set; }
        public string? Notes { get; set; }
        public int Quantity { get; set; }
    }
}