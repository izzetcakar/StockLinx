using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockLinx.Repository.Migrations
{
    /// <inheritdoc />
    public partial class test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_Image_ImageId",
                table: "Category");

            migrationBuilder.DropForeignKey(
                name: "FK_Company_Image_ImageId",
                table: "Company");

            migrationBuilder.DropForeignKey(
                name: "FK_Component_Category_CategoryId",
                table: "Component");

            migrationBuilder.DropForeignKey(
                name: "FK_Component_Company_CompanyId",
                table: "Component");

            migrationBuilder.DropForeignKey(
                name: "FK_Component_Image_ImageId",
                table: "Component");

            migrationBuilder.DropForeignKey(
                name: "FK_Component_Location_LocationId",
                table: "Component");

            migrationBuilder.DropForeignKey(
                name: "FK_Consumable_Category_CategoryId",
                table: "Consumable");

            migrationBuilder.DropForeignKey(
                name: "FK_Consumable_Company_CompanyId",
                table: "Consumable");

            migrationBuilder.DropForeignKey(
                name: "FK_Consumable_Image_ImageId",
                table: "Consumable");

            migrationBuilder.DropForeignKey(
                name: "FK_Consumable_Location_LocationId",
                table: "Consumable");

            migrationBuilder.DropForeignKey(
                name: "FK_Department_Company_CompanyId",
                table: "Department");

            migrationBuilder.DropForeignKey(
                name: "FK_Department_Image_ImageId",
                table: "Department");

            migrationBuilder.DropForeignKey(
                name: "FK_Department_Location_LocationId",
                table: "Department");

            migrationBuilder.DropForeignKey(
                name: "FK_Department_User_ManagerId",
                table: "Department");

            migrationBuilder.DropForeignKey(
                name: "FK_DeployedProduct_Accessory_AccessoryId",
                table: "DeployedProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_DeployedProduct_Asset_AssetId",
                table: "DeployedProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_DeployedProduct_Component_ComponentId",
                table: "DeployedProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_DeployedProduct_Consumable_ConsumableId",
                table: "DeployedProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_DeployedProduct_License_LicenseId",
                table: "DeployedProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_DeployedProduct_User_UserId",
                table: "DeployedProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_License_Category_CategoryId",
                table: "License");

            migrationBuilder.DropForeignKey(
                name: "FK_License_Company_CompanyId",
                table: "License");

            migrationBuilder.DropForeignKey(
                name: "FK_License_Image_ImageId",
                table: "License");

            migrationBuilder.DropForeignKey(
                name: "FK_License_Location_LocationId",
                table: "License");

            migrationBuilder.DropForeignKey(
                name: "FK_License_Supplier_SupplierId",
                table: "License");

            migrationBuilder.DropForeignKey(
                name: "FK_Manufacturer_Image_ImageId",
                table: "Manufacturer");

            migrationBuilder.DropForeignKey(
                name: "FK_Supplier_Image_ImageId",
                table: "Supplier");

            migrationBuilder.DropForeignKey(
                name: "FK_Supplier_Location_LocationId",
                table: "Supplier");

            migrationBuilder.DropTable(
                name: "Accessory");

            migrationBuilder.DropTable(
                name: "Asset");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Model");

            migrationBuilder.DropTable(
                name: "Location");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Supplier",
                table: "Supplier");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Manufacturer",
                table: "Manufacturer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_License",
                table: "License");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Image",
                table: "Image");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DeployedProduct",
                table: "DeployedProduct");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Department",
                table: "Department");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Consumable",
                table: "Consumable");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Component",
                table: "Component");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Company",
                table: "Company");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Category",
                table: "Category");

            migrationBuilder.RenameTable(
                name: "Supplier",
                newName: "Suppliers");

            migrationBuilder.RenameTable(
                name: "Manufacturer",
                newName: "Manufacturers");

            migrationBuilder.RenameTable(
                name: "License",
                newName: "Licenses");

            migrationBuilder.RenameTable(
                name: "Image",
                newName: "Images");

            migrationBuilder.RenameTable(
                name: "DeployedProduct",
                newName: "DeployedProducts");

            migrationBuilder.RenameTable(
                name: "Department",
                newName: "Departments");

            migrationBuilder.RenameTable(
                name: "Consumable",
                newName: "Consumables");

            migrationBuilder.RenameTable(
                name: "Component",
                newName: "Components");

            migrationBuilder.RenameTable(
                name: "Company",
                newName: "Companies");

            migrationBuilder.RenameTable(
                name: "Category",
                newName: "Categories");

            migrationBuilder.RenameIndex(
                name: "IX_Supplier_LocationId",
                table: "Suppliers",
                newName: "IX_Suppliers_LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Supplier_ImageId",
                table: "Suppliers",
                newName: "IX_Suppliers_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Manufacturer_ImageId",
                table: "Manufacturers",
                newName: "IX_Manufacturers_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_License_SupplierId",
                table: "Licenses",
                newName: "IX_Licenses_SupplierId");

            migrationBuilder.RenameIndex(
                name: "IX_License_LocationId",
                table: "Licenses",
                newName: "IX_Licenses_LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_License_ImageId",
                table: "Licenses",
                newName: "IX_Licenses_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_License_CompanyId",
                table: "Licenses",
                newName: "IX_Licenses_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_License_CategoryId",
                table: "Licenses",
                newName: "IX_Licenses_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_DeployedProduct_UserId",
                table: "DeployedProducts",
                newName: "IX_DeployedProducts_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_DeployedProduct_LicenseId",
                table: "DeployedProducts",
                newName: "IX_DeployedProducts_LicenseId");

            migrationBuilder.RenameIndex(
                name: "IX_DeployedProduct_ConsumableId",
                table: "DeployedProducts",
                newName: "IX_DeployedProducts_ConsumableId");

            migrationBuilder.RenameIndex(
                name: "IX_DeployedProduct_ComponentId",
                table: "DeployedProducts",
                newName: "IX_DeployedProducts_ComponentId");

            migrationBuilder.RenameIndex(
                name: "IX_DeployedProduct_AssetId",
                table: "DeployedProducts",
                newName: "IX_DeployedProducts_AssetId");

            migrationBuilder.RenameIndex(
                name: "IX_DeployedProduct_AccessoryId",
                table: "DeployedProducts",
                newName: "IX_DeployedProducts_AccessoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Department_ManagerId",
                table: "Departments",
                newName: "IX_Departments_ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_Department_LocationId",
                table: "Departments",
                newName: "IX_Departments_LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Department_ImageId",
                table: "Departments",
                newName: "IX_Departments_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Department_CompanyId",
                table: "Departments",
                newName: "IX_Departments_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Consumable_LocationId",
                table: "Consumables",
                newName: "IX_Consumables_LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Consumable_ImageId",
                table: "Consumables",
                newName: "IX_Consumables_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Consumable_CompanyId",
                table: "Consumables",
                newName: "IX_Consumables_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Consumable_CategoryId",
                table: "Consumables",
                newName: "IX_Consumables_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Component_LocationId",
                table: "Components",
                newName: "IX_Components_LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Component_ImageId",
                table: "Components",
                newName: "IX_Components_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Component_CompanyId",
                table: "Components",
                newName: "IX_Components_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Component_CategoryId",
                table: "Components",
                newName: "IX_Components_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Company_ImageId",
                table: "Companies",
                newName: "IX_Companies_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Category_ImageId",
                table: "Categories",
                newName: "IX_Categories_ImageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Suppliers",
                table: "Suppliers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Manufacturers",
                table: "Manufacturers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Licenses",
                table: "Licenses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Images",
                table: "Images",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DeployedProducts",
                table: "DeployedProducts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Departments",
                table: "Departments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Consumables",
                table: "Consumables",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Components",
                table: "Components",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Companies",
                table: "Companies",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: true),
                    State = table.Column<string>(type: "text", nullable: true),
                    Country = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: true),
                    Address2 = table.Column<string>(type: "text", nullable: true),
                    Zip = table.Column<string>(type: "text", nullable: true),
                    ParentId = table.Column<Guid>(type: "uuid", nullable: true),
                    Currency = table.Column<double>(type: "double precision", nullable: true),
                    ImageId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Locations_Images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Models",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ModelNo = table.Column<string>(type: "text", nullable: true),
                    ManufacturerId = table.Column<Guid>(type: "uuid", nullable: true),
                    CategoryId = table.Column<Guid>(type: "uuid", nullable: true),
                    ImageId = table.Column<Guid>(type: "uuid", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Models", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Models_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Models_Images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Models_Manufacturers_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Accessories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ManufacturerId = table.Column<Guid>(type: "uuid", nullable: true),
                    SupplierId = table.Column<Guid>(type: "uuid", nullable: true),
                    Warranty = table.Column<int>(type: "integer", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false, defaultValue: 1),
                    SerialNo = table.Column<string>(type: "text", nullable: true),
                    PurchaseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    PurchaseCost = table.Column<double>(type: "double precision", nullable: true),
                    OrderNo = table.Column<string>(type: "text", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ImageId = table.Column<Guid>(type: "uuid", nullable: true),
                    CategoryId = table.Column<Guid>(type: "uuid", nullable: true),
                    LocationId = table.Column<Guid>(type: "uuid", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accessories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Accessories_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Accessories_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Accessories_Images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Accessories_Locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Accessories_Manufacturers_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Accessories_Suppliers_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Suppliers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ImageId = table.Column<Guid>(type: "uuid", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: true),
                    ManagerId = table.Column<Guid>(type: "uuid", nullable: true),
                    DepartmentId = table.Column<Guid>(type: "uuid", nullable: true),
                    LocationId = table.Column<Guid>(type: "uuid", nullable: true),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    AdminLvl = table.Column<string>(type: "text", nullable: true),
                    Language = table.Column<string>(type: "text", nullable: true),
                    EmployeeNo = table.Column<string>(type: "text", nullable: false),
                    JobTitle = table.Column<string>(type: "text", nullable: true),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    PhoneNo = table.Column<string>(type: "text", nullable: true),
                    Website = table.Column<string>(type: "text", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Users_Departments_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Users_Images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Users_Locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Assets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ModelId = table.Column<Guid>(type: "uuid", nullable: true),
                    Tag = table.Column<int>(type: "integer", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: true, defaultValue: 0),
                    CheckinCounter = table.Column<int>(type: "integer", nullable: true, defaultValue: 0),
                    CheckoutCounter = table.Column<int>(type: "integer", nullable: true, defaultValue: 0),
                    ManufacturerId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false, defaultValue: 1),
                    SerialNo = table.Column<string>(type: "text", nullable: true),
                    PurchaseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    PurchaseCost = table.Column<double>(type: "double precision", nullable: true),
                    OrderNo = table.Column<string>(type: "text", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    ImageId = table.Column<Guid>(type: "uuid", nullable: true),
                    CategoryId = table.Column<Guid>(type: "uuid", nullable: true),
                    LocationId = table.Column<Guid>(type: "uuid", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Assets_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Assets_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Assets_Images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Assets_Locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Assets_Manufacturers_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Assets_Models_ModelId",
                        column: x => x.ModelId,
                        principalTable: "Models",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accessories_CategoryId",
                table: "Accessories",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Accessories_CompanyId",
                table: "Accessories",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Accessories_ImageId",
                table: "Accessories",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Accessories_LocationId",
                table: "Accessories",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Accessories_ManufacturerId",
                table: "Accessories",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Accessories_SupplierId",
                table: "Accessories",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_CategoryId",
                table: "Assets",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_CompanyId",
                table: "Assets",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_ImageId",
                table: "Assets",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_LocationId",
                table: "Assets",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_ManufacturerId",
                table: "Assets",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Assets_ModelId",
                table: "Assets",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Locations_ImageId",
                table: "Locations",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Models_CategoryId",
                table: "Models",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Models_ImageId",
                table: "Models",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Models_ManufacturerId",
                table: "Models",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_CompanyId",
                table: "Users",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_ImageId",
                table: "Users",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_LocationId",
                table: "Users",
                column: "LocationId");

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
                name: "FK_Components_Categories_CategoryId",
                table: "Components",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Components_Companies_CompanyId",
                table: "Components",
                column: "CompanyId",
                principalTable: "Companies",
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
                name: "FK_Components_Locations_LocationId",
                table: "Components",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Consumables_Categories_CategoryId",
                table: "Consumables",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Consumables_Companies_CompanyId",
                table: "Consumables",
                column: "CompanyId",
                principalTable: "Companies",
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
                name: "FK_Consumables_Locations_LocationId",
                table: "Consumables",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Departments_Companies_CompanyId",
                table: "Departments",
                column: "CompanyId",
                principalTable: "Companies",
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
                name: "FK_Departments_Locations_LocationId",
                table: "Departments",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Departments_Users_ManagerId",
                table: "Departments",
                column: "ManagerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_DeployedProducts_Accessories_AccessoryId",
                table: "DeployedProducts",
                column: "AccessoryId",
                principalTable: "Accessories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_DeployedProducts_Assets_AssetId",
                table: "DeployedProducts",
                column: "AssetId",
                principalTable: "Assets",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_DeployedProducts_Components_ComponentId",
                table: "DeployedProducts",
                column: "ComponentId",
                principalTable: "Components",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_DeployedProducts_Consumables_ConsumableId",
                table: "DeployedProducts",
                column: "ConsumableId",
                principalTable: "Consumables",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_DeployedProducts_Licenses_LicenseId",
                table: "DeployedProducts",
                column: "LicenseId",
                principalTable: "Licenses",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_DeployedProducts_Users_UserId",
                table: "DeployedProducts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Licenses_Categories_CategoryId",
                table: "Licenses",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Licenses_Companies_CompanyId",
                table: "Licenses",
                column: "CompanyId",
                principalTable: "Companies",
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
                name: "FK_Licenses_Locations_LocationId",
                table: "Licenses",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Licenses_Suppliers_SupplierId",
                table: "Licenses",
                column: "SupplierId",
                principalTable: "Suppliers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Manufacturers_Images_ImageId",
                table: "Manufacturers",
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
                name: "FK_Suppliers_Locations_LocationId",
                table: "Suppliers",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Images_ImageId",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Images_ImageId",
                table: "Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_Components_Categories_CategoryId",
                table: "Components");

            migrationBuilder.DropForeignKey(
                name: "FK_Components_Companies_CompanyId",
                table: "Components");

            migrationBuilder.DropForeignKey(
                name: "FK_Components_Images_ImageId",
                table: "Components");

            migrationBuilder.DropForeignKey(
                name: "FK_Components_Locations_LocationId",
                table: "Components");

            migrationBuilder.DropForeignKey(
                name: "FK_Consumables_Categories_CategoryId",
                table: "Consumables");

            migrationBuilder.DropForeignKey(
                name: "FK_Consumables_Companies_CompanyId",
                table: "Consumables");

            migrationBuilder.DropForeignKey(
                name: "FK_Consumables_Images_ImageId",
                table: "Consumables");

            migrationBuilder.DropForeignKey(
                name: "FK_Consumables_Locations_LocationId",
                table: "Consumables");

            migrationBuilder.DropForeignKey(
                name: "FK_Departments_Companies_CompanyId",
                table: "Departments");

            migrationBuilder.DropForeignKey(
                name: "FK_Departments_Images_ImageId",
                table: "Departments");

            migrationBuilder.DropForeignKey(
                name: "FK_Departments_Locations_LocationId",
                table: "Departments");

            migrationBuilder.DropForeignKey(
                name: "FK_Departments_Users_ManagerId",
                table: "Departments");

            migrationBuilder.DropForeignKey(
                name: "FK_DeployedProducts_Accessories_AccessoryId",
                table: "DeployedProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_DeployedProducts_Assets_AssetId",
                table: "DeployedProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_DeployedProducts_Components_ComponentId",
                table: "DeployedProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_DeployedProducts_Consumables_ConsumableId",
                table: "DeployedProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_DeployedProducts_Licenses_LicenseId",
                table: "DeployedProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_DeployedProducts_Users_UserId",
                table: "DeployedProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_Licenses_Categories_CategoryId",
                table: "Licenses");

            migrationBuilder.DropForeignKey(
                name: "FK_Licenses_Companies_CompanyId",
                table: "Licenses");

            migrationBuilder.DropForeignKey(
                name: "FK_Licenses_Images_ImageId",
                table: "Licenses");

            migrationBuilder.DropForeignKey(
                name: "FK_Licenses_Locations_LocationId",
                table: "Licenses");

            migrationBuilder.DropForeignKey(
                name: "FK_Licenses_Suppliers_SupplierId",
                table: "Licenses");

            migrationBuilder.DropForeignKey(
                name: "FK_Manufacturers_Images_ImageId",
                table: "Manufacturers");

            migrationBuilder.DropForeignKey(
                name: "FK_Suppliers_Images_ImageId",
                table: "Suppliers");

            migrationBuilder.DropForeignKey(
                name: "FK_Suppliers_Locations_LocationId",
                table: "Suppliers");

            migrationBuilder.DropTable(
                name: "Accessories");

            migrationBuilder.DropTable(
                name: "Assets");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Models");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Suppliers",
                table: "Suppliers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Manufacturers",
                table: "Manufacturers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Licenses",
                table: "Licenses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Images",
                table: "Images");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DeployedProducts",
                table: "DeployedProducts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Departments",
                table: "Departments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Consumables",
                table: "Consumables");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Components",
                table: "Components");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Companies",
                table: "Companies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.RenameTable(
                name: "Suppliers",
                newName: "Supplier");

            migrationBuilder.RenameTable(
                name: "Manufacturers",
                newName: "Manufacturer");

            migrationBuilder.RenameTable(
                name: "Licenses",
                newName: "License");

            migrationBuilder.RenameTable(
                name: "Images",
                newName: "Image");

            migrationBuilder.RenameTable(
                name: "DeployedProducts",
                newName: "DeployedProduct");

            migrationBuilder.RenameTable(
                name: "Departments",
                newName: "Department");

            migrationBuilder.RenameTable(
                name: "Consumables",
                newName: "Consumable");

            migrationBuilder.RenameTable(
                name: "Components",
                newName: "Component");

            migrationBuilder.RenameTable(
                name: "Companies",
                newName: "Company");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "Category");

            migrationBuilder.RenameIndex(
                name: "IX_Suppliers_LocationId",
                table: "Supplier",
                newName: "IX_Supplier_LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Suppliers_ImageId",
                table: "Supplier",
                newName: "IX_Supplier_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Manufacturers_ImageId",
                table: "Manufacturer",
                newName: "IX_Manufacturer_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Licenses_SupplierId",
                table: "License",
                newName: "IX_License_SupplierId");

            migrationBuilder.RenameIndex(
                name: "IX_Licenses_LocationId",
                table: "License",
                newName: "IX_License_LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Licenses_ImageId",
                table: "License",
                newName: "IX_License_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Licenses_CompanyId",
                table: "License",
                newName: "IX_License_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Licenses_CategoryId",
                table: "License",
                newName: "IX_License_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_DeployedProducts_UserId",
                table: "DeployedProduct",
                newName: "IX_DeployedProduct_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_DeployedProducts_LicenseId",
                table: "DeployedProduct",
                newName: "IX_DeployedProduct_LicenseId");

            migrationBuilder.RenameIndex(
                name: "IX_DeployedProducts_ConsumableId",
                table: "DeployedProduct",
                newName: "IX_DeployedProduct_ConsumableId");

            migrationBuilder.RenameIndex(
                name: "IX_DeployedProducts_ComponentId",
                table: "DeployedProduct",
                newName: "IX_DeployedProduct_ComponentId");

            migrationBuilder.RenameIndex(
                name: "IX_DeployedProducts_AssetId",
                table: "DeployedProduct",
                newName: "IX_DeployedProduct_AssetId");

            migrationBuilder.RenameIndex(
                name: "IX_DeployedProducts_AccessoryId",
                table: "DeployedProduct",
                newName: "IX_DeployedProduct_AccessoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Departments_ManagerId",
                table: "Department",
                newName: "IX_Department_ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_Departments_LocationId",
                table: "Department",
                newName: "IX_Department_LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Departments_ImageId",
                table: "Department",
                newName: "IX_Department_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Departments_CompanyId",
                table: "Department",
                newName: "IX_Department_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Consumables_LocationId",
                table: "Consumable",
                newName: "IX_Consumable_LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Consumables_ImageId",
                table: "Consumable",
                newName: "IX_Consumable_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Consumables_CompanyId",
                table: "Consumable",
                newName: "IX_Consumable_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Consumables_CategoryId",
                table: "Consumable",
                newName: "IX_Consumable_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Components_LocationId",
                table: "Component",
                newName: "IX_Component_LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Components_ImageId",
                table: "Component",
                newName: "IX_Component_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Components_CompanyId",
                table: "Component",
                newName: "IX_Component_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Components_CategoryId",
                table: "Component",
                newName: "IX_Component_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Companies_ImageId",
                table: "Company",
                newName: "IX_Company_ImageId");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_ImageId",
                table: "Category",
                newName: "IX_Category_ImageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Supplier",
                table: "Supplier",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Manufacturer",
                table: "Manufacturer",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_License",
                table: "License",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Image",
                table: "Image",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DeployedProduct",
                table: "DeployedProduct",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Department",
                table: "Department",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Consumable",
                table: "Consumable",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Component",
                table: "Component",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Company",
                table: "Company",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Category",
                table: "Category",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Location",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ImageId = table.Column<Guid>(type: "uuid", nullable: true),
                    Address = table.Column<string>(type: "text", nullable: true),
                    Address2 = table.Column<string>(type: "text", nullable: true),
                    City = table.Column<string>(type: "text", nullable: true),
                    Country = table.Column<string>(type: "text", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Currency = table.Column<double>(type: "double precision", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ParentId = table.Column<Guid>(type: "uuid", nullable: true),
                    State = table.Column<string>(type: "text", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Zip = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Location", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Location_Image_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Image",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Model",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uuid", nullable: true),
                    ImageId = table.Column<Guid>(type: "uuid", nullable: true),
                    ManufacturerId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ModelNo = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Model", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Model_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Model_Image_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Image",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Model_Manufacturer_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Accessory",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uuid", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: true),
                    ImageId = table.Column<Guid>(type: "uuid", nullable: true),
                    LocationId = table.Column<Guid>(type: "uuid", nullable: true),
                    ManufacturerId = table.Column<Guid>(type: "uuid", nullable: true),
                    SupplierId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    OrderNo = table.Column<string>(type: "text", nullable: true),
                    PurchaseCost = table.Column<double>(type: "double precision", nullable: true),
                    PurchaseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Quantity = table.Column<int>(type: "integer", nullable: false, defaultValue: 1),
                    SerialNo = table.Column<string>(type: "text", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Warranty = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accessory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Accessory_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Accessory_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Accessory_Image_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Image",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Accessory_Location_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Accessory_Manufacturer_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Accessory_Supplier_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Supplier",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: true),
                    ImageId = table.Column<Guid>(type: "uuid", nullable: true),
                    LocationId = table.Column<Guid>(type: "uuid", nullable: true),
                    AdminLvl = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DepartmentId = table.Column<Guid>(type: "uuid", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: false),
                    EmployeeNo = table.Column<string>(type: "text", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    JobTitle = table.Column<string>(type: "text", nullable: true),
                    Language = table.Column<string>(type: "text", nullable: true),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    ManagerId = table.Column<Guid>(type: "uuid", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    Password = table.Column<string>(type: "text", nullable: false),
                    PhoneNo = table.Column<string>(type: "text", nullable: true),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Website = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_User_Department_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Department",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_User_Image_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Image",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_User_Location_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Asset",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uuid", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: true),
                    ImageId = table.Column<Guid>(type: "uuid", nullable: true),
                    LocationId = table.Column<Guid>(type: "uuid", nullable: true),
                    ManufacturerId = table.Column<Guid>(type: "uuid", nullable: true),
                    ModelId = table.Column<Guid>(type: "uuid", nullable: true),
                    CheckinCounter = table.Column<int>(type: "integer", nullable: true, defaultValue: 0),
                    CheckoutCounter = table.Column<int>(type: "integer", nullable: true, defaultValue: 0),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    OrderNo = table.Column<string>(type: "text", nullable: true),
                    PurchaseCost = table.Column<double>(type: "double precision", nullable: true),
                    PurchaseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Quantity = table.Column<int>(type: "integer", nullable: false, defaultValue: 1),
                    SerialNo = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: true, defaultValue: 0),
                    Tag = table.Column<int>(type: "integer", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Asset", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Asset_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Asset_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Asset_Image_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Image",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Asset_Location_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Asset_Manufacturer_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Asset_Model_ModelId",
                        column: x => x.ModelId,
                        principalTable: "Model",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accessory_CategoryId",
                table: "Accessory",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Accessory_CompanyId",
                table: "Accessory",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Accessory_ImageId",
                table: "Accessory",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Accessory_LocationId",
                table: "Accessory",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Accessory_ManufacturerId",
                table: "Accessory",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Accessory_SupplierId",
                table: "Accessory",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_Asset_CategoryId",
                table: "Asset",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Asset_CompanyId",
                table: "Asset",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Asset_ImageId",
                table: "Asset",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Asset_LocationId",
                table: "Asset",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Asset_ManufacturerId",
                table: "Asset",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Asset_ModelId",
                table: "Asset",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Location_ImageId",
                table: "Location",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Model_CategoryId",
                table: "Model",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Model_ImageId",
                table: "Model",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Model_ManufacturerId",
                table: "Model",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_User_CompanyId",
                table: "User",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_User_ImageId",
                table: "User",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_User_LocationId",
                table: "User",
                column: "LocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Image_ImageId",
                table: "Category",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Company_Image_ImageId",
                table: "Company",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Component_Category_CategoryId",
                table: "Component",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Component_Company_CompanyId",
                table: "Component",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Component_Image_ImageId",
                table: "Component",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Component_Location_LocationId",
                table: "Component",
                column: "LocationId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Consumable_Category_CategoryId",
                table: "Consumable",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Consumable_Company_CompanyId",
                table: "Consumable",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Consumable_Image_ImageId",
                table: "Consumable",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Consumable_Location_LocationId",
                table: "Consumable",
                column: "LocationId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Department_Company_CompanyId",
                table: "Department",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Department_Image_ImageId",
                table: "Department",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Department_Location_LocationId",
                table: "Department",
                column: "LocationId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Department_User_ManagerId",
                table: "Department",
                column: "ManagerId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_DeployedProduct_Accessory_AccessoryId",
                table: "DeployedProduct",
                column: "AccessoryId",
                principalTable: "Accessory",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_DeployedProduct_Asset_AssetId",
                table: "DeployedProduct",
                column: "AssetId",
                principalTable: "Asset",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_DeployedProduct_Component_ComponentId",
                table: "DeployedProduct",
                column: "ComponentId",
                principalTable: "Component",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_DeployedProduct_Consumable_ConsumableId",
                table: "DeployedProduct",
                column: "ConsumableId",
                principalTable: "Consumable",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_DeployedProduct_License_LicenseId",
                table: "DeployedProduct",
                column: "LicenseId",
                principalTable: "License",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_DeployedProduct_User_UserId",
                table: "DeployedProduct",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_License_Category_CategoryId",
                table: "License",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_License_Company_CompanyId",
                table: "License",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_License_Image_ImageId",
                table: "License",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_License_Location_LocationId",
                table: "License",
                column: "LocationId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_License_Supplier_SupplierId",
                table: "License",
                column: "SupplierId",
                principalTable: "Supplier",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Manufacturer_Image_ImageId",
                table: "Manufacturer",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Supplier_Image_ImageId",
                table: "Supplier",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Supplier_Location_LocationId",
                table: "Supplier",
                column: "LocationId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
