using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class TagsNote
    {
        public Guid Id { get; set; }
        public Guid NoteId { get; set; }
        public Guid TagId { get; set; }

        [JsonIgnore] public Note Note { get; set; }
        [JsonIgnore] public Tag Tag { get; set; }
    }
}
