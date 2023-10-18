using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockLinx.Repository.Migrations
{
    /// <inheritdoc />
    public partial class updateManufacturer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Website",
                table: "Manufacturers",
                newName: "URL");

            migrationBuilder.AddColumn<string>(
                name: "SupportURL",
                table: "Manufacturers",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SupportURL",
                table: "Manufacturers");

            migrationBuilder.RenameColumn(
                name: "URL",
                table: "Manufacturers",
                newName: "Website");
        }
    }
}
