﻿using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Create
{
    public record PermissionCreateDto : BaseRecord
    {
        public Guid BranchId { get; init; }
        public Guid UserId { get; init; }
    }
}
