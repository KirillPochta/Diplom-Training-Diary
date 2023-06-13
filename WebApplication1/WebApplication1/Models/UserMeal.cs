using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace WebApplication1.Models
{
    public class UserMeal // тут повторки потому что так надо, ибо Calories/belok/jir/yglerodi будут иметь другие значения
    {
        // крч, пользователь в поиске нашел свою еду, выбирает например
        // Name = "Йогурт 1,5%", Calories = 57, Belok = 4.1, Jir = 1.5, Yglerodi = 5.9
        // getKbzu дал какую-то норму, собственно, пользователь выбирает какую массу йогурта 1.5% он хочет, например 50 грамм
        // значит Калории от йогурта = 50 * 57(калории) / 100 по аналогии остальное
        // белок = 50 * 4.1 / 100
        // жир = 50 * 1.5 / 100
        // углеводы = 50 * 5.9 / 100
        // результат плюсуется в цель для каждой полоски
        // когда пользователь нажал добавить еду, возле полоски цели должно быть видно сколько осталось, до цели

        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid MealId { get; set; }
        public string MealTime { get; set; } //dinner/breakfast/lunch/snack
        public double Calories { get; set; } // Все в грамах 
        public double Belok { get; set; }
        public double Jir { get; set; }
        public double Yglerodi { get; set; }
        public double Mass { get; set; }
        public User User { get; internal set; }
        public Meal Meal { get; internal set; }
    }
}
