using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockLinx.Repository.Migrations
{
    /// <inheritdoc />
    public partial class removeLocationImg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Locations");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Locations",
                type: "text",
                nullable: true);
        }
    }
}
