using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace WebApplication1.Models
{
    public class AudioTape
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public byte[] Image { get; set; }
        public byte[] Mp3 { get; set; }
        [JsonIgnore] public List<UserAudiotape> UserAudiotapesList { get; set; }

    }
}
