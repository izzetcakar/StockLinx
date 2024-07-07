using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class GenericRepository : Repository<User>, IGenericRepository
    {
        public GenericRepository(AppDbContext dbContext)
            : base(dbContext) { }

        public void CreateBaseEntities()
        {
            var newLocations = new List<Location>
            {
                new Location
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Özyer Merkez",
                    Address = "Özyer Merkez Adres",
                    City = "Muğla",
                    Country = "Türkiye",
                    ZipCode = "48300",
                },
                new Location
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Hanel Merkez",
                    Address = "Hanel Merkez Adres",
                    City = "Muğla",
                    Country = "Türkiye",
                    ZipCode = "48300",
                },
                new Location
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Melden Merkez",
                    Address = "Melden Merkez Adres",
                    City = "Muğla",
                    Country = "Türkiye",
                    ZipCode = "48300",
                }
            };
            dbContext.Locations.AddRange(newLocations);
            var newCompanies = new List<Company>
            {
                new Company
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Özyer",
                    Tag = "SO-001",
                    LocationId = newLocations[0].Id
                },
                new Company
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Hanel",
                    Tag = "SH-001",
                    LocationId = newLocations[1].Id
                },
                new Company
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Melden",
                    Tag = "SM-001",
                    LocationId = newLocations[2].Id
                },
            };
            dbContext.Companies.AddRange(newCompanies);
            var newDepartments = new List<Department>();
            foreach (var company in newCompanies)
            {
                newDepartments.Add(
                    new Department
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.UtcNow,
                        CompanyId = company.Id,
                        Name = "İnsan Kaynakları"
                    }
                );
                newDepartments.Add(
                    new Department
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.UtcNow,
                        CompanyId = company.Id,
                        Name = "Muhasebe"
                    }
                );
                newDepartments.Add(
                    new Department
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.UtcNow,
                        CompanyId = company.Id,
                        Name = "İdari İşler"
                    }
                );
                newDepartments.Add(
                    new Department
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.UtcNow,
                        CompanyId = company.Id,
                        Name = "Bilgi İşlem"
                    }
                );
            }
            dbContext.Departments.AddRange(newDepartments);
            var newUser = new User()
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow,
                Email = "admin@gmail.com",
                Password = "123",
                FirstName = "adminF",
                LastName = "adminL",
            };

            dbContext.Users.Add(newUser);
            var newCategoies = new List<Category>
            {
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Bilgisayar",
                    Type = CategoryType.ASSET
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Telefon",
                    Type = CategoryType.ASSET
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Monitör",
                    Type = CategoryType.ASSET
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Klavye",
                    Type = CategoryType.ACCESSORY
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Fare",
                    Type = CategoryType.ACCESSORY
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "HDD/SSD",
                    Type = CategoryType.COMPONENT
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Yazıcı",
                    Type = CategoryType.COMPONENT
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Windows Lisans",
                    Type = CategoryType.LICENSE
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Office Lisans",
                    Type = CategoryType.LICENSE
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Kartuş",
                    Type = CategoryType.CONSUMABLE
                },
            };
            dbContext.Categories.AddRange(newCategoies);
            var newManufacturers = new List<Manufacturer>
            {
                new Manufacturer
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Apple",
                    URL = "https://www.apple.com/tr/",
                    SupportURL = "https://support.apple.com/tr-tr",
                    SupportPhone = "444 55 77",
                    SupportEmail = "support@apple.com",
                    Notes = null
                },
                new Manufacturer
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Samsung",
                    URL = "https://www.samsung.com/tr/",
                    SupportURL = "https://www.samsung.com/tr/support/",
                    SupportPhone = "444 77 55",
                    SupportEmail = "support@samsung.com",
                },
                new Manufacturer
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "HP",
                    URL = "https://www.hp.com/tr/tr/home.html",
                    SupportURL = "https://support.hp.com/tr-tr",
                    SupportPhone = "444 55 77",
                    SupportEmail = "hp@support.com",
                },
                new Manufacturer
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Lenovo",
                    URL = "https://www.lenovo.com/tr/tr/",
                    SupportURL = "https://support.lenovo.com/tr/tr/",
                    SupportPhone = "444 55 77",
                    SupportEmail = "lenovo@support.com"
                },
                new Manufacturer
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Microsoft",
                    URL = "https://www.microsoft.com/tr-tr",
                    SupportURL = "https://support.microsoft.com/tr-tr",
                    SupportPhone = "444 55 77",
                    SupportEmail = "microsoft@support.com"
                },
                new Manufacturer
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Logitech",
                    URL = "https://www.logitech.com/tr-tr",
                    SupportURL = "https://support.logitech.com/tr_tr/home",
                    SupportPhone = "444 55 77",
                    SupportEmail = "logitech@support.com"
                },
                new Manufacturer
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Dell",
                    URL = "https://www.dell.com/tr/tr/",
                    SupportURL = "https://www.dell.com/tr/tr/support-home/",
                    SupportPhone = "444 55 77",
                    SupportEmail = "dell@support.com"
                }
            };
            dbContext.Manufacturers.AddRange(newManufacturers);
            var newSuppliers = new List<Supplier>
            {
                new Supplier
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Vatan Bilgisayar",
                    Fax = "444 55 77",
                    Website = "https://www.vatanbilgisayar.com/",
                    ContactPhone = "444 55 77",
                    ContactName = "Vatan Contact",
                    ContactEmail = "contact@vatan.com",
                },
                new Supplier
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Teknosa",
                    Fax = "444 55 77",
                    Website = "https://www.teknosa.com/",
                    ContactPhone = "444 55 77",
                    ContactName = "Teknosa Contact",
                    ContactEmail = "contact@teknosa.com",
                },
                new Supplier
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Media Markt",
                    Fax = "444 55 77",
                    Website = "https://www.mediamarkt.com.tr/",
                    ContactPhone = "444 55 77",
                    ContactName = "Media Contact",
                    ContactEmail = "contact@mediamarkt.com"
                },
            };
            dbContext.Suppliers.AddRange(newSuppliers);
            var newFieldSets = new List<FieldSet>
            {
                new FieldSet
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Laptop ve Masaüstü",
                },
                new FieldSet
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Telefon",
                },
            };
            dbContext.FieldSets.AddRange(newFieldSets);
            var newCustomFields = new List<CustomField>
            {
                new CustomField
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Marka",
                    DefaultValue = "Samsung",
                    HelpText = "Telefon markası",
                    Type = "string",
                    IsRequired = true,
                    ValidationRegex = null,
                    ValidationText = "Telefon markası giriniz",
                    FieldSetCustomFields = new List<FieldSetCustomField>
                    {
                        new FieldSetCustomField
                        {
                            Id = Guid.NewGuid(),
                            CreatedDate = DateTime.UtcNow,
                            FieldSetId = newFieldSets[1].Id,
                            CustomFieldId = Guid.NewGuid()
                        }
                    }
                },
                new CustomField
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Model",
                    DefaultValue = "Galaxy S10",
                    HelpText = "Telefon modeli",
                    Type = "string",
                    IsRequired = true,
                    ValidationRegex = null,
                    ValidationText = "Telefon modeli giriniz",
                },
                new CustomField
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "CPU",
                    DefaultValue = null,
                    HelpText = "İşlemci",
                    Type = "string",
                    IsRequired = true,
                    ValidationRegex = null,
                    ValidationText = "İşlemci giriniz",
                },
                new CustomField
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "GPU",
                    DefaultValue = null,
                    HelpText = "Ekran kartı",
                    Type = "string",
                    IsRequired = true,
                    ValidationRegex = null,
                    ValidationText = "Ekran kartı giriniz",
                },
                new CustomField
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "RAM",
                    DefaultValue = null,
                    HelpText = "RAM",
                    Type = "number",
                    IsRequired = true,
                    ValidationRegex = null,
                    ValidationText = "RAM giriniz",
                },
                new CustomField
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "HDD",
                    DefaultValue = null,
                    HelpText = "HDD",
                    Type = "string",
                    IsRequired = true,
                    ValidationRegex = null,
                    ValidationText = "HDD giriniz",
                },
            };
            dbContext.CustomFields.AddRange(newCustomFields);
            var newProductStatuses = new List<ProductStatus>
            {
                new ProductStatus
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Stokta",
                    Type = ProductStatusType.AVAILABLE
                },
                new ProductStatus
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Zimmetli",
                    Type = ProductStatusType.DEPLOYED
                },
                new ProductStatus
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Arızalı",
                    Type = ProductStatusType.DAMAGED
                },
                new ProductStatus
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Stokta Yok",
                    Type = ProductStatusType.OUT_OF_STOCK
                },
                new ProductStatus
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Sipariş Edildi",
                    Type = ProductStatusType.ORDERED
                },
            };
            dbContext.ProductStatuses.AddRange(newProductStatuses);
        }

        public void ClearBaseEntities()
        {
            dbContext.RemoveRange(dbContext.Locations);
            dbContext.RemoveRange(dbContext.Companies);
            dbContext.RemoveRange(dbContext.Departments);
            dbContext.RemoveRange(dbContext.Users);
            dbContext.RemoveRange(dbContext.Categories);
            dbContext.RemoveRange(dbContext.Manufacturers);
            dbContext.RemoveRange(dbContext.Suppliers);
            dbContext.RemoveRange(dbContext.FieldSets);
            dbContext.RemoveRange(dbContext.CustomFields);
            dbContext.RemoveRange(dbContext.ProductStatuses);
        }

        public IEnumerable<EntityCounter> GetEntityCounts()
        {
            var entityCounts = new List<EntityCounter>();
            var accessoryCount = dbContext.Accessories.Count();
            var licenseCount = dbContext.Licenses.Count();
            var consumableCount = dbContext.Consumables.Count();
            var assetCount = dbContext.Assets.Count();
            var componentCount = dbContext.Components.Count();
            var userCount = dbContext.Users.Count();
            entityCounts.Add(
                new EntityCounter { EntityName = "Accessory", Count = accessoryCount }
            );
            entityCounts.Add(new EntityCounter { EntityName = "License", Count = licenseCount });
            entityCounts.Add(
                new EntityCounter { EntityName = "Consumable", Count = consumableCount }
            );
            entityCounts.Add(new EntityCounter { EntityName = "Asset", Count = assetCount });
            entityCounts.Add(
                new EntityCounter { EntityName = "Component", Count = componentCount }
            );
            entityCounts.Add(new EntityCounter { EntityName = "User", Count = userCount });
            return entityCounts;
        }

        public IEnumerable<ProductStatusCounter> GetProductStatusCounts()
        {
            var productStatusCounts = new List<ProductStatusCounter>();
            var assets = dbContext.Assets;
            var productStatuses = dbContext.ProductStatuses;

            productStatusCounts = productStatuses
                .Select(status => new ProductStatusCounter { Count = 0, Status = status.Name })
                .ToList();
            return productStatusCounts;
        }

        public IEnumerable<ProductLocationCounterDto> GetProductLocationCounts()
        {
            var productLocationCounts = new List<ProductLocationCounterDto>();
            var locations = dbContext.Locations;
            var assets = dbContext.Assets;
            // var deployedAssets = dbContext.DeployedProducts;
            productLocationCounts = locations
                .Select(l => new ProductLocationCounterDto
                {
                    LocationId = l.Id,
                    LocationName = l.Name,
                    ProductCount = assets.Where(a => a.Company.LocationId == l.Id).Count(),
                    AssignedCount = 0
                })
                .ToList();
            return productLocationCounts;
        }

        public IEnumerable<ProductCategoryCounterDto> GetProductCategoryCounts()
        {
            var productCategoryCounts = new List<ProductCategoryCounterDto>();

            var assetCount = dbContext
                .Models.Where(m => m.Category.Type == CategoryType.ASSET)
                .Count();
            var accessoryCount = dbContext
                .Accessories.Where(m => m.Category.Type == CategoryType.ACCESSORY)
                .Count();
            var componentCount = dbContext
                .Components.Where(m => m.Category.Type == CategoryType.COMPONENT)
                .Count();
            var consumableCount = dbContext
                .Consumables.Where(m => m.Category.Type == CategoryType.CONSUMABLE)
                .Count();
            var licenseCount = dbContext
                .Licenses.Where(m => m.Category.Type == CategoryType.LICENSE)
                .Count();

            var assets = dbContext
                .Models.Where(m => m.Category.Type == CategoryType.ASSET)
                .Select(m => new ProductCategoryCounterDto
                {
                    CategoryId = (Guid)m.CategoryId,
                    CategoryName = m.Category.Name,
                    ProductName = "Asset",
                    ProductCount = assetCount,
                })
                .ToList();
            var accessories = dbContext
                .Accessories.Where(a => a.CategoryId != null)
                .Select(a => new ProductCategoryCounterDto
                {
                    CategoryId = (Guid)a.CategoryId,
                    CategoryName = a.Category.Name,
                    ProductName = "Accessory",
                    ProductCount = accessoryCount,
                })
                .ToList();
            var components = dbContext
                .Components.Where(c => c.CategoryId != null)
                .Select(c => new ProductCategoryCounterDto
                {
                    CategoryId = (Guid)c.CategoryId,
                    CategoryName = c.Category.Name,
                    ProductName = "Component",
                    ProductCount = componentCount,
                })
                .ToList();
            var consumables = dbContext
                .Consumables.Where(c => c.CategoryId != null)
                .Select(c => new ProductCategoryCounterDto
                {
                    CategoryId = (Guid)c.CategoryId,
                    CategoryName = c.Category.Name,
                    ProductName = "Consumable",
                    ProductCount = consumableCount,
                })
                .ToList();
            var licenses = dbContext
                .Licenses.Where(l => l.CategoryId != null)
                .Select(l => new ProductCategoryCounterDto
                {
                    CategoryId = (Guid)l.CategoryId,
                    CategoryName = l.Category.Name,
                    ProductName = "License",
                    ProductCount = licenseCount,
                })
                .ToList();
            return productCategoryCounts
                .Concat(assets)
                .Concat(accessories)
                .Concat(components)
                .Concat(consumables)
                .Concat(licenses);
        }
    }
}
