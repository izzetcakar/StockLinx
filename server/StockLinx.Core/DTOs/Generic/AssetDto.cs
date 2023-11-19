﻿namespace StockLinx.Core.DTOs.Generic
{
    public class AssetDto : BaseProductDto
    {
        public Guid? ModelId { get; set; }
        public Guid ProductStatusId { get; set; }
        public string? TagNo { get; set; }
        public string? SerialNo { get; set; }
    }
}
