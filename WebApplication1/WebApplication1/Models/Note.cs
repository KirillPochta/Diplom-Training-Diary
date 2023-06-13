using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using JsonIgnoreAttribute = Newtonsoft.Json.JsonIgnoreAttribute;

namespace WebApplication1.Models
{
    public class Note
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }

        public string Date { get; set; }
        public string EventDate { get; set; }
        [JsonProperty("title")]
        public string Name { get; set; }

        [JsonProperty("content")]
        public string Body { get; set; }
        public bool IsPinned { get; set; }
        public string Priority { get; set; }
        public string color { get; set; }
        virtual public User User { get; set; }
        [JsonIgnore] virtual public List<TagsNote> NoteTagsList { get; set; }

        public Note()
        {
            NoteTagsList = new List<TagsNote>();
        }
    }
}
