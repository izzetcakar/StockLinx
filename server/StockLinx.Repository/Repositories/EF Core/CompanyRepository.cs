using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class CompanyRepository : Repository<Company>, ICompanyRepository
    {
        private readonly IMapper _mapper;
        public CompanyRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task CreateBaseAdmin()
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
                    LocationId = newLocations[0].Id
                },
                new Company
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Hanel",
                    LocationId = newLocations[1].Id
                },
                new Company
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Melden",
                    LocationId = newLocations[2].Id
                },
            };
            dbContext.Companies.AddRange(newCompanies);
            var newBranches = new List<Branch>();
            foreach (var company in newCompanies)
            {
                newBranches.Add(new Branch
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    CompanyId = company.Id,
                    Name = $"{company.Name} Merkez"
                });
            }
            dbContext.Branches.AddRange(newBranches);
            var newDepartments = new List<Department>();
            foreach (var branch in newBranches)
            {
                newDepartments.Add(new Department
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    BranchId = branch.Id,
                    Name = "İnsan Kaynakları"
                });
                newDepartments.Add(new Department
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    BranchId = branch.Id,
                    Name = "Muhasebe"
                });
                newDepartments.Add(new Department
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    BranchId = branch.Id,
                    Name = "İdari İşler"
                });
                newDepartments.Add(new Department
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    BranchId = branch.Id,
                    Name = "Bilgi İşlem"
                });
            }
            dbContext.Departments.AddRange(newDepartments);
            var newUser = new User();
            newUser.Id = Guid.NewGuid();
            newUser.CreatedDate = DateTime.UtcNow;
            newUser.DepartmentId = newDepartments[0].Id;
            newUser.Email = "admin@gmail.com";
            newUser.Password = "123";
            newUser.FirstName = "adminF";
            newUser.LastName = "adminL";
            newUser.EmployeeNo = "111";
            newUser.StartDate = DateTime.UtcNow;
            dbContext.Users.Add(newUser);
            var newCategoies = new List<Category>
            {
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Bilgisayar",
                    Type = CategoryType.Asset
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Telefon",
                    Type = CategoryType.Asset
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Monitör",
                    Type = CategoryType.Asset
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Klavye",
                    Type = CategoryType.Accessory
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Fare",
                    Type = CategoryType.Accessory
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "HDD/SSD",
                    Type = CategoryType.Component
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Yazıcı",
                    Type = CategoryType.Component
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Windows Lisans",
                    Type = CategoryType.License
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Office Lisans",
                    Type = CategoryType.License
                },
                new Category
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Name = "Kartuş",
                    Type = CategoryType.Consumable
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
        public CompanyDto GetDto(Company entity)
        {
            return _mapper.Map<CompanyDto>(entity);
        }
        public List<CompanyDto> GetDtos(List<Company> entities)
        {
            var dtos = new List<CompanyDto>();
            dtos = _mapper.Map<List<CompanyDto>>(entities);
            return dtos;
        }
        public async Task<List<CompanyDto>> GetAllDtos()
        {
            var entities = await dbContext.Companies.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
