using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Tag
    {
        public Guid Id { get; set; }
        public string NameTag { get; set; }
        [JsonIgnore] public User User { get; set; }
        [JsonIgnore] virtual public List<TagsNote> NoteTagsList { get; set; }
        public Tag()
        {
            NoteTagsList = new List<TagsNote>();
        }
    }
}
