﻿using StockLinx.Core.Models;

namespace StockLinx.Core.Entities
{
    public enum CategoryType
    {
        Asset,
        Accessory,
        Component,
        Consumable
    }
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public CategoryType Type { get; set; }
        public Guid? ImageId { get; set; }
        public Image? Image { get; set; }

        //Relates
        public ICollection<Asset> Assets { get; set; }
        public ICollection<Accessory> Accessories { get; set; }
        public ICollection<Component> Components { get; set; }
        public ICollection<Consumable> Consumables { get; set; }
        public ICollection<License> Licenses { get; set; }
        public ICollection<Model> Models { get; set; }
    }
}
