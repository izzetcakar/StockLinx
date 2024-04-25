using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockLinx.Core.DTOs.Others
{
    public class ProductCheckInDto
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public DateTime AssignDate { get; set; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
    }
}
