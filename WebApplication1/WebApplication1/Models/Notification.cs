using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Notification
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Date { get; set; }
        [JsonProperty("info")]
        public string Name { get; set; }
        [JsonIgnore] public User User { get; set; }
    }
}
