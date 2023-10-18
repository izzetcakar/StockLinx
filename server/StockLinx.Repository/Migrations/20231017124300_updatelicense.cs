using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockLinx.Repository.Migrations
{
    /// <inheritdoc />
    public partial class updatelicense : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Licenses_Suppliers_SupplierId",
                table: "Licenses");

            migrationBuilder.RenameColumn(
                name: "SupplierId",
                table: "Licenses",
                newName: "ManufacturerId");

            migrationBuilder.RenameIndex(
                name: "IX_Licenses_SupplierId",
                table: "Licenses",
                newName: "IX_Licenses_ManufacturerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Licenses_Manufacturers_ManufacturerId",
                table: "Licenses",
                column: "ManufacturerId",
                principalTable: "Manufacturers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Licenses_Manufacturers_ManufacturerId",
                table: "Licenses");

            migrationBuilder.RenameColumn(
                name: "ManufacturerId",
                table: "Licenses",
                newName: "SupplierId");

            migrationBuilder.RenameIndex(
                name: "IX_Licenses_ManufacturerId",
                table: "Licenses",
                newName: "IX_Licenses_SupplierId");

            migrationBuilder.AddForeignKey(
                name: "FK_Licenses_Suppliers_SupplierId",
                table: "Licenses",
                column: "SupplierId",
                principalTable: "Suppliers",
                principalColumn: "Id");
        }
    }
}
