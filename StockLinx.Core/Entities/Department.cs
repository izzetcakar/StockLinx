namespace StockLinx.Core.Entities
{
    public class Department
    {
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public Guid ManagerId { get; set; }
        public Guid LocationId { get; set; }
        public Guid ImageId { get; set; }
        public string Title { get; set; }
    }
}
