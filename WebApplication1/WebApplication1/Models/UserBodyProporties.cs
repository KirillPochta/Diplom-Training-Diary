using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class UserBodyProporties
    {
        [JsonIgnore] public User User { get; set; }
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public int Chest { get; set; }
        public int Waist { get; set; }
        public int Hips { get; set; }
        public int BodyMassIndex { get; set; }
        public string UserFatness { get; set; }
        public string Activity { get; set; }
        public string Goal { get; set; }
        public int DailyBelok { get; set; }
        public int DailyJir { get; set; }
        public int DailyYglevod { get; set; }
        public int DailyNormalCaloriesMiffanSanJeora { get; set; }
        public int DailyNormalCaloriesHarrisMenedict { get; set; }
    }
}
