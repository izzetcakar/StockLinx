using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockLinx.Repository.Migrations
{
    /// <inheritdoc />
    public partial class updateentities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accessories_Images_ImageId",
                table: "Accessories");

            migrationBuilder.DropForeignKey(
                name: "FK_Assets_Images_ImageId",
                table: "Assets");

            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Images_ImageId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Images_ImageId",
                table: "Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_Components_Images_ImageId",
                table: "Components");

            migrationBuilder.DropForeignKey(
                name: "FK_Consumables_Images_ImageId",
                table: "Consumables");

            migrationBuilder.DropForeignKey(
                name: "FK_Departments_Images_ImageId",
                table: "Departments");

            migrationBuilder.DropForeignKey(
                name: "FK_Licenses_Images_ImageId",
                table: "Licenses");

            migrationBuilder.DropForeignKey(
                name: "FK_Locations_Images_ImageId",
                table: "Locations");

            migrationBuilder.DropForeignKey(
                name: "FK_Manufacturers_Images_ImageId",
                table: "Manufacturers");

            migrationBuilder.DropForeignKey(
                name: "FK_Models_Images_ImageId",
                table: "Models");

            migrationBuilder.DropForeignKey(
                name: "FK_Suppliers_Images_ImageId",
                table: "Suppliers");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Images_ImageId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Users_ImageId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Suppliers_ImageId",
                table: "Suppliers");

            migrationBuilder.DropIndex(
                name: "IX_Manufacturers_ImageId",
                table: "Manufacturers");

            migrationBuilder.DropIndex(
                name: "IX_Locations_ImageId",
                table: "Locations");

            migrationBuilder.DropIndex(
                name: "IX_Departments_ImageId",
                table: "Departments");

            migrationBuilder.DropIndex(
                name: "IX_Companies_ImageId",
                table: "Companies");

            migrationBuilder.DropIndex(
                name: "IX_Categories_ImageId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ManagerId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Manufacturers");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "Tag",
                table: "Consumables");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "Tag",
                table: "Assets");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "Suppliers",
                newName: "Website");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Suppliers",
                newName: "ImagePath");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Suppliers",
                newName: "ContactPhone");

            migrationBuilder.RenameColumn(
                name: "ImageId",
                table: "Models",
                newName: "ProductStatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Models_ImageId",
                table: "Models",
                newName: "IX_Models_ProductStatusId");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "Manufacturers",
                newName: "Website");

            migrationBuilder.RenameColumn(
                name: "Zip",
                table: "Locations",
                newName: "ZipCode");

            migrationBuilder.RenameColumn(
                name: "ProductKey",
                table: "Licenses",
                newName: "LicenseKey");

            migrationBuilder.RenameColumn(
                name: "LicenseName",
                table: "Licenses",
                newName: "ImagePath");

            migrationBuilder.RenameColumn(
                name: "ImageId",
                table: "Licenses",
                newName: "StatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Licenses_ImageId",
                table: "Licenses",
                newName: "IX_Licenses_StatusId");

            migrationBuilder.RenameColumn(
                name: "ImageId",
                table: "Consumables",
                newName: "StatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Consumables_ImageId",
                table: "Consumables",
                newName: "IX_Consumables_StatusId");

            migrationBuilder.RenameColumn(
                name: "ImageId",
                table: "Components",
                newName: "StatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Components_ImageId",
                table: "Components",
                newName: "IX_Components_StatusId");

            migrationBuilder.RenameColumn(
                name: "ImageId",
                table: "Assets",
                newName: "StatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Assets_ImageId",
                table: "Assets",
                newName: "IX_Assets_StatusId");

            migrationBuilder.RenameColumn(
                name: "Warranty",
                table: "Accessories",
                newName: "CheckoutCounter");

            migrationBuilder.RenameColumn(
                name: "ImageId",
                table: "Accessories",
                newName: "StatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Accessories_ImageId",
                table: "Accessories",
                newName: "IX_Accessories_StatusId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "Users",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "DepartmentId",
                table: "Users",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CompanyId",
                table: "Users",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactEmail",
                table: "Suppliers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Models",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Manufacturers",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Currency",
                table: "Locations",
                type: "text",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double precision",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "City",
                table: "Locations",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Locations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Locations",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Reassignable",
                table: "Licenses",
                type: "boolean",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Maintained",
                table: "Licenses",
                type: "boolean",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CheckinCounter",
                table: "Licenses",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CheckoutCounter",
                table: "Licenses",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Departments",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Consumables",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CheckinCounter",
                table: "Components",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CheckoutCounter",
                table: "Components",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Components",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Companies",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Categories",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Assets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TagNo",
                table: "Assets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CheckinCounter",
                table: "Accessories",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "Accessories",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "WarrantyDate",
                table: "Accessories",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProductStatuses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductStatuses", x => x.Id);
                });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ContactEmail",
                table: "Suppliers");

            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Models");

            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Manufacturers");

            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "CheckinCounter",
                table: "Licenses");

            migrationBuilder.DropColumn(
                name: "CheckoutCounter",
                table: "Licenses");

            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Consumables");

            migrationBuilder.DropColumn(
                name: "CheckinCounter",
                table: "Components");

            migrationBuilder.DropColumn(
                name: "CheckoutCounter",
                table: "Components");

            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Components");

            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "TagNo",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "CheckinCounter",
                table: "Accessories");

            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "Accessories");

            migrationBuilder.DropColumn(
                name: "WarrantyDate",
                table: "Accessories");

            migrationBuilder.RenameColumn(
                name: "Website",
                table: "Suppliers",
                newName: "Url");

            migrationBuilder.RenameColumn(
                name: "ImagePath",
                table: "Suppliers",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "ContactPhone",
                table: "Suppliers",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "ProductStatusId",
                table: "Models",
                newName: "ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Models_ProductStatusId",
                table: "Models",
                newName: "IX_Models_ImageId");

            migrationBuilder.RenameColumn(
                name: "Website",
                table: "Manufacturers",
                newName: "Url");

            migrationBuilder.RenameColumn(
                name: "ZipCode",
                table: "Locations",
                newName: "Zip");

            migrationBuilder.RenameColumn(
                name: "StatusId",
                table: "Licenses",
                newName: "ImageId");

            migrationBuilder.RenameColumn(
                name: "LicenseKey",
                table: "Licenses",
                newName: "ProductKey");

            migrationBuilder.RenameColumn(
                name: "ImagePath",
                table: "Licenses",
                newName: "LicenseName");

            migrationBuilder.RenameIndex(
                name: "IX_Licenses_StatusId",
                table: "Licenses",
                newName: "IX_Licenses_ImageId");

            migrationBuilder.RenameColumn(
                name: "StatusId",
                table: "Consumables",
                newName: "ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Consumables_StatusId",
                table: "Consumables",
                newName: "IX_Consumables_ImageId");

            migrationBuilder.RenameColumn(
                name: "StatusId",
                table: "Components",
                newName: "ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Components_StatusId",
                table: "Components",
                newName: "IX_Components_ImageId");

            migrationBuilder.RenameColumn(
                name: "StatusId",
                table: "Assets",
                newName: "ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Assets_StatusId",
                table: "Assets",
                newName: "IX_Assets_ImageId");

            migrationBuilder.RenameColumn(
                name: "StatusId",
                table: "Accessories",
                newName: "ImageId");

            migrationBuilder.RenameColumn(
                name: "CheckoutCounter",
                table: "Accessories",
                newName: "Warranty");

            migrationBuilder.RenameIndex(
                name: "IX_Accessories_StatusId",
                table: "Accessories",
                newName: "IX_Accessories_ImageId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "Users",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<Guid>(
                name: "DepartmentId",
                table: "Users",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<Guid>(
                name: "CompanyId",
                table: "Users",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                table: "Users",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ManagerId",
                table: "Users",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                table: "Suppliers",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                table: "Manufacturers",
                type: "uuid",
                nullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "Currency",
                table: "Locations",
                type: "double precision",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "City",
                table: "Locations",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                table: "Locations",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ParentId",
                table: "Locations",
                type: "uuid",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Reassignable",
                table: "Licenses",
                type: "boolean",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AlterColumn<bool>(
                name: "Maintained",
                table: "Licenses",
                type: "boolean",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                table: "Departments",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Tag",
                table: "Consumables",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                table: "Companies",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                table: "Categories",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Categories",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Assets",
                type: "integer",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Assets",
                type: "integer",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Tag",
                table: "Assets",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Path = table.Column<string>(type: "text", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_ImageId",
                table: "Users",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_ImageId",
                table: "Suppliers",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Manufacturers_ImageId",
                table: "Manufacturers",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Locations_ImageId",
                table: "Locations",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Departments_ImageId",
                table: "Departments",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_ImageId",
                table: "Companies",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ImageId",
                table: "Categories",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Accessories_Images_ImageId",
                table: "Accessories",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_Images_ImageId",
                table: "Assets",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Images_ImageId",
                table: "Categories",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Images_ImageId",
                table: "Companies",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Components_Images_ImageId",
                table: "Components",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Consumables_Images_ImageId",
                table: "Consumables",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Departments_Images_ImageId",
                table: "Departments",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Licenses_Images_ImageId",
                table: "Licenses",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Locations_Images_ImageId",
                table: "Locations",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Manufacturers_Images_ImageId",
                table: "Manufacturers",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Models_Images_ImageId",
                table: "Models",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Suppliers_Images_ImageId",
                table: "Suppliers",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Images_ImageId",
                table: "Users",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
