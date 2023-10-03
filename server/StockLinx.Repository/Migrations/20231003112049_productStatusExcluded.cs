using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockLinx.Repository.Migrations
{
    /// <inheritdoc />
    public partial class productStatusExcluded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accessories_ProductStatuses_StatusId",
                table: "Accessories");

            migrationBuilder.DropForeignKey(
                name: "FK_Assets_ProductStatuses_StatusId",
                table: "Assets");

            migrationBuilder.DropForeignKey(
                name: "FK_Components_ProductStatuses_StatusId",
                table: "Components");

            migrationBuilder.DropForeignKey(
                name: "FK_Consumables_ProductStatuses_StatusId",
                table: "Consumables");

            migrationBuilder.DropForeignKey(
                name: "FK_Licenses_ProductStatuses_StatusId",
                table: "Licenses");

            migrationBuilder.DropForeignKey(
                name: "FK_Models_ProductStatuses_ProductStatusId",
                table: "Models");

            migrationBuilder.DropTable(
                name: "ProductStatuses");

            migrationBuilder.DropIndex(
                name: "IX_Models_ProductStatusId",
                table: "Models");

            migrationBuilder.DropIndex(
                name: "IX_Licenses_StatusId",
                table: "Licenses");

            migrationBuilder.DropIndex(
                name: "IX_Consumables_StatusId",
                table: "Consumables");

            migrationBuilder.DropIndex(
                name: "IX_Components_StatusId",
                table: "Components");

            migrationBuilder.DropIndex(
                name: "IX_Assets_StatusId",
                table: "Assets");

            migrationBuilder.DropIndex(
                name: "IX_Accessories_StatusId",
                table: "Accessories");

            migrationBuilder.DropColumn(
                name: "ProductStatusId",
                table: "Models");

            migrationBuilder.AddColumn<int>(
                name: "ProductStatus",
                table: "Licenses",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductStatus",
                table: "Consumables",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductStatus",
                table: "Components",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductStatus",
                table: "Assets",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductStatus",
                table: "Accessories",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductStatus",
                table: "Licenses");

            migrationBuilder.DropColumn(
                name: "ProductStatus",
                table: "Consumables");

            migrationBuilder.DropColumn(
                name: "ProductStatus",
                table: "Components");

            migrationBuilder.DropColumn(
                name: "ProductStatus",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "ProductStatus",
                table: "Accessories");

            migrationBuilder.AddColumn<Guid>(
                name: "ProductStatusId",
                table: "Models",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProductStatuses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductStatuses", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Models_ProductStatusId",
                table: "Models",
                column: "ProductStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Licenses_StatusId",
                table: "Licenses",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Consumables_StatusId",
                table: "Consumables",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Components_StatusId",
                table: "Components",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_StatusId",
                table: "Assets",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Accessories_StatusId",
                table: "Accessories",
                column: "StatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Accessories_ProductStatuses_StatusId",
                table: "Accessories",
                column: "StatusId",
                principalTable: "ProductStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_ProductStatuses_StatusId",
                table: "Assets",
                column: "StatusId",
                principalTable: "ProductStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Components_ProductStatuses_StatusId",
                table: "Components",
                column: "StatusId",
                principalTable: "ProductStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Consumables_ProductStatuses_StatusId",
                table: "Consumables",
                column: "StatusId",
                principalTable: "ProductStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Licenses_ProductStatuses_StatusId",
                table: "Licenses",
                column: "StatusId",
                principalTable: "ProductStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Models_ProductStatuses_ProductStatusId",
                table: "Models",
                column: "ProductStatusId",
                principalTable: "ProductStatuses",
                principalColumn: "Id");
        }
    }
}
