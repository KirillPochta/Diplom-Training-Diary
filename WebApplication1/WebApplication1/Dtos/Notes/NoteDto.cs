using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Dtos.Notes
{
    public class NoteDto
    {
        public string Date { get; set; }
        public string EventDate { get; set; }
        public Guid UserId { get; set; }
        
        [JsonProperty("title")]
        public string Name { get; set; }

        [JsonProperty("content")]
        public string Body { get; set; }
        public string Color { get; set; }
        public string Priority { get; set; }
    }
}
