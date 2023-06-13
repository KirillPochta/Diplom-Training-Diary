using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class UserAudiotape
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string AudiotapeId { get; set; }
        [JsonIgnore] public User User { get; internal set; }
        [JsonIgnore] public AudioTape Audiotape { get; internal set; }
    }
}
