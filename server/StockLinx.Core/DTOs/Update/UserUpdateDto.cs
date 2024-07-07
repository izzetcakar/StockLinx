
namespace StockLinx.Core.DTOs.Update
{
    public class UserUpdateDto : BaseUpdateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Notes { get; set; }
    }
}
