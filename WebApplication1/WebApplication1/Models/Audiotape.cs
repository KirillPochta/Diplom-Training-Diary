using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace WebApplication1.Models
{
    public class Audiotape
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public double Duration { get; set; }
        [JsonIgnore] public List<UserAudiotape> UserAudiotapesList { get; set; }

    }
}
