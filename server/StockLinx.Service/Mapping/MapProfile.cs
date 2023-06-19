using AutoMapper;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Service.Mapping
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<Accessory, AccessoryDto>().ReverseMap();
            CreateMap<Asset, AssetDto>().ReverseMap();
            CreateMap<BaseProduct, BaseProductDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Company, CompanyDto>().ReverseMap();
            CreateMap<Component, ComponentDto>().ReverseMap();
            CreateMap<Consumable, ConsumableDto>().ReverseMap();
            CreateMap<Department, DepartmentDto>().ReverseMap();
            CreateMap<DeployedProduct, DepartmentDto>().ReverseMap();
            CreateMap<Image, ImageDto>().ReverseMap();
            CreateMap<License, LicenseDto>().ReverseMap();
            CreateMap<Location, LocationDto>().ReverseMap();
            CreateMap<Manufacturer, ManufacturerDto>().ReverseMap();
            CreateMap<Model, ModelDto>().ReverseMap();
            CreateMap<Supplier, SupplierDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
