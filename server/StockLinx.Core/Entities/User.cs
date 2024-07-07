namespace StockLinx.Core.Entities
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Notes { get; set; }
        public bool IsAdmin { get; init; } = false;
        public ICollection<Permission>? Permissions { get; set; }
    }
}
