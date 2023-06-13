using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class UserTraining
    {
        public Guid Id { get; set; }
        public string TrainingId { get; set; }
        public Guid UserId { get; set; }
        [JsonIgnore] public Training Training { get; set; }
        [JsonIgnore] public User User { get; set; }
    }
}
