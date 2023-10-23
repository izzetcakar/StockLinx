namespace StockLinx.Core.DTOs.Create
{
    public class CompanyCreateDto
    {
        public Guid? LocationId { get; set; }
        public string Name { get; set; }
        public string? Email { get; set; }
        public string? ImagePath { get; set; }
    }
}
