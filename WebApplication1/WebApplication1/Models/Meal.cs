using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace WebApplication1.Models
{
    public class Meal
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Calories { get; set; } // Это всё в 100 граммах каждого продукта
        public double Belok { get; set; }
        public double Jir { get; set; }
        public double Yglerodi { get; set; }
        [JsonIgnore] public List<UserMeal> UserMealsList { get; set; }
    }
}
