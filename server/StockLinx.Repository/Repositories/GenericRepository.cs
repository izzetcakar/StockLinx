using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class GenericRepository : Repository<User>, IGenericRepository
    {
        private readonly IUserService _userService;
        private readonly IPermissionRepository _permissionRepository;
        private readonly IEmployeeProductRepository _employeeProductRepository;
        private readonly IAssetProductRepository _assetProductRepository;

        public GenericRepository(
            AppDbContext dbContext,
            IUserService userService,
            IPermissionRepository permissionRepository,
            IEmployeeProductRepository employeeProductRepository,
            IAssetProductRepository assetProductRepository
        )
            : base(dbContext)
        {
            _userService = userService;
            _permissionRepository = permissionRepository;
            _employeeProductRepository = employeeProductRepository;
            _assetProductRepository = assetProductRepository;
        }

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
            dbContext.RemoveRange(dbContext.ProductStatuses);
        }

        public async Task<IEnumerable<EntityCounter>> GetEntityCounts()
        {
            var entityCounts = new List<EntityCounter>();
            var user = await _userService.GetCurrentUser();
            var companyIds = await _permissionRepository.GetCompanyIdsAsync(user.Id);
            var accessoryCount = dbContext.Accessories.Count(a => companyIds.Contains(a.CompanyId));
            var assetCount = dbContext.Assets.Count(a => companyIds.Contains(a.CompanyId));
            var licenseCount = dbContext.Licenses.Count(l => companyIds.Contains(l.CompanyId));
            var componentCount = dbContext.Components.Count(c => companyIds.Contains(c.CompanyId));
            var consumableCount = dbContext.Consumables.Count(c =>
                companyIds.Contains(c.CompanyId)
            );
            var employeeCount = dbContext.Employees.Count(e =>
                companyIds.Contains(e.Department.CompanyId)
            );
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
            entityCounts.Add(new EntityCounter { EntityName = "Employee", Count = employeeCount });
            return entityCounts;
        }

        public async Task<IEnumerable<ProductStatusCounter>> GetProductStatusCounts()
        {
            var productStatusCounts = new List<ProductStatusCounter>();
            var user = await _userService.GetCurrentUser();
            var companyIds = await _permissionRepository.GetCompanyIdsAsync(user.Id);
            var assets = await dbContext
                .Assets.Where(a => companyIds.Contains(a.CompanyId))
                .ToListAsync();
            var productStatuses = dbContext.ProductStatuses;

            foreach (var status in productStatuses)
            {
                var count = assets.Where(a => a.ProductStatusId == status.Id).Count();
                productStatusCounts.Add(
                    new ProductStatusCounter { Count = count, Status = status.Name }
                );
            }
            return productStatusCounts;
        }

        public async Task<IEnumerable<ProductCompanyCounterDto>> GetProductCompanyCounts()
        {
            var productCompanyCounts = new List<ProductCompanyCounterDto>();
            var user = await _userService.GetCurrentUser();
            var companyIds = await _permissionRepository.GetCompanyIdsAsync(user.Id);
            var employeeProducts = await _employeeProductRepository.GetAllByCompanies(companyIds);
            var assetProducts = await _assetProductRepository.GetAllByCompanies(companyIds);
            var companies = await dbContext
                .Companies.Where(c => companyIds.Contains(c.Id))
                .Include(c => c.Components)
                .Include(c => c.Licenses)
                .Include(c => c.Assets)
                .Include(c => c.Consumables)
                .Include(c => c.Accessories)
                .AsNoTracking()
                .ToListAsync();

            foreach (var company in companies)
            {
                var productCompany = new ProductCompanyCounterDto
                {
                    Company = company.Tag,
                    AssignedCount = employeeProducts.Where(ep => ep.Employee.Department.CompanyId == company.Id).Sum(ep => ep.Quantity)
                    + assetProducts.Where(ap => ap.Asset.CompanyId == company.Id).Sum(ap => ap.Quantity),
                    ProductCount = company.Licenses.Sum(li => li.Quantity)
                    + company.Components.Sum(cm => cm.Quantity)
                    + company.Consumables.Sum(cn => cn.Quantity)
                    + company.Accessories.Sum(ac => ac.Quantity)
                    + company.Assets.Count()
                };
                productCompanyCounts.Add(productCompany);
            }

            return productCompanyCounts;
        }

        public async Task<IEnumerable<ProductCategoryCounterDto>> GetProductCategoryCounts()
        {
            var productCategoryCounts = new List<ProductCategoryCounterDto>();
            var user = await _userService.GetCurrentUser();
            var companyIds = await _permissionRepository.GetCompanyIdsAsync(user.Id);

            var modelCount = dbContext.Models
                .Count(m => m.Category.Type == CategoryType.ASSET);

            var accessoryCount = dbContext.Accessories
                .Where(ac => companyIds.Contains(ac.CompanyId))
                .Count(m => m.Category.Type == CategoryType.ACCESSORY);

            var componentCount = dbContext.Components
                .Where(ac => companyIds.Contains(ac.CompanyId))
                .Count(m => m.Category.Type == CategoryType.COMPONENT);

            var consumableCount = dbContext.Consumables
                .Where(ac => companyIds.Contains(ac.CompanyId))
                .Count(m => m.Category.Type == CategoryType.CONSUMABLE);

            var licenseCount = dbContext.Licenses
                .Where(ac => companyIds.Contains(ac.CompanyId))
                .Count(m => m.Category.Type == CategoryType.LICENSE);

            var models = dbContext.Models
                .Where(m => m.CategoryId != null)
                .Select(m => new ProductCategoryCounterDto
                {
                    CategoryId = (Guid)m.CategoryId,
                    ProductName = "Model",
                    ProductCount = modelCount,
                })
                .ToList();

            var accessories = dbContext
                .Accessories.Where(a => a.CategoryId != null)
                .Select(a => new ProductCategoryCounterDto
                {
                    CategoryId = (Guid)a.CategoryId,
                    ProductName = "Accessory",
                    ProductCount = accessoryCount,
                })
                .ToList();
            var components = dbContext
                .Components.Where(c => c.CategoryId != null)
                .Select(c => new ProductCategoryCounterDto
                {
                    CategoryId = (Guid)c.CategoryId,
                    ProductName = "Component",
                    ProductCount = componentCount,
                })
                .ToList();
            var consumables = dbContext
                .Consumables.Where(c => c.CategoryId != null)
                .Select(c => new ProductCategoryCounterDto
                {
                    CategoryId = (Guid)c.CategoryId,
                    ProductName = "Consumable",
                    ProductCount = consumableCount,
                })
                .ToList();
            var licenses = dbContext
                .Licenses.Where(l => l.CategoryId != null)
                .Select(l => new ProductCategoryCounterDto
                {
                    CategoryId = (Guid)l.CategoryId,
                    ProductName = "License",
                    ProductCount = licenseCount,
                })
                .ToList();

            var result = productCategoryCounts
                .Concat(models)
                .Concat(accessories)
                .Concat(components)
                .Concat(consumables)
                .Concat(licenses)
                .Where(pc => pc.ProductCount != 0);
            return result;
        }
    }
}
