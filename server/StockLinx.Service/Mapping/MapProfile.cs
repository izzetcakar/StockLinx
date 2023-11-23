using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Service.Mapping
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<Accessory, AccessoryDto>().ReverseMap();
            CreateMap<Accessory, AccessoryCreateDto>().ReverseMap();
            CreateMap<Accessory, AccessoryUpdateDto>().ReverseMap();
            CreateMap<Asset, AssetDto>().ReverseMap();
            CreateMap<Asset, AssetCreateDto>().ReverseMap();
            CreateMap<Asset, AssetUpdateDto>().ReverseMap();
            CreateMap<BaseProduct, BaseProductDto>().ReverseMap();
            CreateMap<BaseProduct, BaseProductCreateDto>().ReverseMap();
            CreateMap<BaseProduct, BaseProductUpdateDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Category, CategoryCreateDto>().ReverseMap();
            CreateMap<Category, CategoryUpdateDto>().ReverseMap();
            CreateMap<Company, CompanyDto>().ReverseMap();
            CreateMap<Company, CompanyCreateDto>().ReverseMap();
            CreateMap<Company, CompanyUpdateDto>().ReverseMap();
            CreateMap<Component, ComponentDto>().ReverseMap();
            CreateMap<Component, ComponentCreateDto>().ReverseMap();
            CreateMap<Component, ComponentUpdateDto>().ReverseMap();
            CreateMap<Consumable, ConsumableDto>().ReverseMap();
            CreateMap<Consumable, ConsumableCreateDto>().ReverseMap();
            CreateMap<Consumable, ConsumableUpdateDto>().ReverseMap();
            CreateMap<Department, DepartmentDto>().ReverseMap();
            CreateMap<Department, DepartmentCreateDto>().ReverseMap();
            CreateMap<Department, DepartmentUpdateDto>().ReverseMap();
            CreateMap<DeployedProduct, DeployedProductDto>().ReverseMap();
            CreateMap<DeployedProduct, DeployedProductCreateDto>().ReverseMap();
            CreateMap<DeployedProduct, DeployedProductUpdateDto>().ReverseMap();
            CreateMap<License, LicenseDto>().ReverseMap();
            CreateMap<License, LicenseCreateDto>().ReverseMap();
            CreateMap<License, LicenseUpdateDto>().ReverseMap();
            CreateMap<Location, LocationDto>().ReverseMap();
            CreateMap<Location, LocationCreateDto>().ReverseMap();
            CreateMap<Location, LocationUpdateDto>().ReverseMap();
            CreateMap<Manufacturer, ManufacturerDto>().ReverseMap();
            CreateMap<Manufacturer, ManufacturerCreateDto>().ReverseMap();
            CreateMap<Manufacturer, ManufacturerUpdateDto>().ReverseMap();
            CreateMap<Model, ModelDto>().ReverseMap();
            CreateMap<Model, ModelCreateDto>().ReverseMap();
            CreateMap<Model, ModelUpdateDto>().ReverseMap();
            CreateMap<FieldSet, FieldSetDto>().ReverseMap();
            CreateMap<FieldSet, FieldSetCreateDto>().ReverseMap();
            CreateMap<FieldSet, FieldSetUpdateDto>().ReverseMap();
            CreateMap<CustomField, CustomFieldDto>().ReverseMap();
            CreateMap<CustomField, CustomFieldCreateDto>().ReverseMap();
            CreateMap<CustomField, CustomFieldUpdateDto>().ReverseMap();
            CreateMap<ModelFieldData, ModelFieldDataDto>().ReverseMap();
            CreateMap<ModelFieldData, ModelFieldDataCreateDto>().ReverseMap();
            CreateMap<ModelFieldData, ModelFieldDataUpdateDto>().ReverseMap();
            CreateMap<Supplier, SupplierDto>().ReverseMap();
            CreateMap<Supplier, SupplierCreateDto>().ReverseMap();
            CreateMap<Supplier, SupplierUpdateDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserCreateDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
            CreateMap<User, UserUpdateDto>().ReverseMap();
            CreateMap<ProductStatus, ProductStatusDto>().ReverseMap();
            CreateMap<ProductStatus, ProductStatusCreateDto>().ReverseMap();
            CreateMap<ProductStatus, ProductStatusUpdateDto>().ReverseMap();
            CreateMap<Branch, BranchDto>().ReverseMap();
            CreateMap<Branch, BranchCreateDto>().ReverseMap();
            CreateMap<Branch, BranchUpdateDto>().ReverseMap();
            CreateMap<CustomField, CustomFieldDto>().ReverseMap();
            CreateMap<CustomField, CustomFieldCreateDto>().ReverseMap();
            CreateMap<CustomField, CustomFieldUpdateDto>().ReverseMap();
            CreateMap<FieldSet, FieldSetDto>().ReverseMap();
            CreateMap<FieldSet, FieldSetCreateDto>().ReverseMap();
            CreateMap<FieldSet, FieldSetUpdateDto>().ReverseMap();
        }
    }
}
