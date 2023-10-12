using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockLinx.Repository.Migrations
{
    /// <inheritdoc />
    public partial class updatestatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Licenses");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Consumables");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Components");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Accessories");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "StatusId",
                table: "Licenses",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "StatusId",
                table: "Consumables",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "StatusId",
                table: "Components",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "StatusId",
                table: "Assets",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "StatusId",
                table: "Accessories",
                type: "uuid",
                nullable: true);
        }
    }
}
