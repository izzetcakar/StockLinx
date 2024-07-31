using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;
using StockLinx.Repository;
using StockLinx.Repository.Repositories.EF_Core;
using StockLinx.Repository.UnitOfWork;
using StockLinx.Service.Mapping;
using StockLinx.Service.Services;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "CORSPolicy",
        builder =>
        {
            builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
        }
    );
});

builder.Services.Configure<FormOptions>(o =>
{
    o.ValueLengthLimit = int.MaxValue;
    o.MultipartBodyLengthLimit = int.MaxValue;
    o.MemoryBufferThreshold = int.MaxValue;
});
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped(typeof(IService<>), typeof(Service<>));
builder.Services.AddScoped(typeof(IFilterService<>), typeof(FilterService<>));
builder.Services.AddScoped<ICustomLogRepository, CustomLogRepository>();
builder.Services.AddScoped<ICustomLogService, CustomLogService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAssetRepository, AssetRepository>();
builder.Services.AddScoped<IAssetService, AssetService>();
builder.Services.AddScoped<IAccessoryRepository, AccessoryRepository>();
builder.Services.AddScoped<IAccessoryService, AccessoryService>();
builder.Services.AddScoped<IComponentRepository, ComponentRepository>();
builder.Services.AddScoped<IComponentService, ComponentService>();
builder.Services.AddScoped<IConsumableRepository, ConsumableRepository>();
builder.Services.AddScoped<IConsumableService, ConsumableService>();
builder.Services.AddScoped<IAssetProductRepository, AssetProductRepository>();
builder.Services.AddScoped<IAssetProductService, AssetProductService>();
builder.Services.AddScoped<IEmployeeProductRepository, EmployeeProductRepository>();
builder.Services.AddScoped<IEmployeeProductService, EmployeeProductService>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<ILicenseRepository, LicenseRepository>();
builder.Services.AddScoped<ILicenseService, LicenseService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<ILocationRepository, LocationRepository>();
builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<IManufacturerRepository, ManufacturerRepository>();
builder.Services.AddScoped<IManufacturerService, ManufacturerService>();
builder.Services.AddScoped<IModelRepository, ModelRepository>();
builder.Services.AddScoped<IModelService, ModelService>();
builder.Services.AddScoped<ISupplierRepository, SupplierRepository>();
builder.Services.AddScoped<ISupplierService, SupplierService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProductStatusRepository, ProductStatusRepository>();
builder.Services.AddScoped<IProductStatusService, ProductStatusService>();
builder.Services.AddScoped<IPermissionRepository, PermissionRepository>();
builder.Services.AddScoped<IPermissionService, PermissionService>();
builder.Services.AddScoped<IGenericRepository, GenericRepository>();
builder.Services.AddScoped<IGenericService, GenericService>();
builder.Services.AddAutoMapper(typeof(MapProfile));
builder.Services.AddHttpContextAccessor();

builder
    .Services.AddControllersWithViews()
    .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddDbContext<AppDbContext>(x =>
{
    x.UseNpgsql(
        builder.Configuration.GetConnectionString("SqlConnection"),
        option =>
        {
            option.MigrationsAssembly(Assembly.GetAssembly(typeof(AppDbContext)).GetName().Name);
        }
    );
});

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(
        "oauth2",
        new OpenApiSecurityScheme
        {
            Description =
                "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
            In = ParameterLocation.Header,
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey
        }
    );

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "http://localhost:7000";
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0"
                )
            ),
            ValidateIssuer = true,
            ValidIssuer = "https://localhost:7000",
            ValidateAudience = true,
            ValidAudiences = new[]
            {
                "https://localhost:7000",
                "https://localhost:7001",
                "http://localhost:5173",
                "http://192.168.1.144",
                "http://172.28.208.1",
                "http://192.168.35.163",
                "http://172.28.48.1",
            },
            RequireExpirationTime = true,
        };
    });
builder.Services.AddAuthorization(auth =>
{
    auth.AddPolicy(
        "Bearer",
        new AuthorizationPolicyBuilder()
            .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme‌​)
            .RequireAuthenticatedUser()
            .Build()
    );
});
builder.Services.AddCors(options =>
    options.AddPolicy(
        name: "NgOrigins",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173", "http://192.168.1.104")
                .AllowAnyMethod()
                .AllowAnyHeader();
        }
    )
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CORSPolicy");

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseStaticFiles(
    new StaticFileOptions()
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(), @"Resources")
        ),
        RequestPath = new PathString("/Resources")
    }
);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
