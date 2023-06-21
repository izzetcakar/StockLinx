using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockLinx.Repository.Migrations
{
    /// <inheritdoc />
    public partial class adminTitle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminLvl",
                table: "Users");

            migrationBuilder.AddColumn<bool>(
                name: "IsAdmin",
                table: "Users",
                type: "boolean",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAdmin",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "AdminLvl",
                table: "Users",
                type: "text",
                nullable: true);
        }
    }
}
