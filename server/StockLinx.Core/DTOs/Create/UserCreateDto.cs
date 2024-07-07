namespace StockLinx.Core.DTOs.Create
{
    public class UserCreateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Notes { get; set; }
        public bool? IsAdmin { get; init; } = false;
    }
}
