using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Image { get; set; }
        public int RoleId { get; set; }
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Interests { get; set; }
        public string Country { get; set; }
        public string FavMusic { get; set; }
        public DateTime Joined { get; set; }
        public DateTime Birth { get; set; }
        [JsonIgnore] public string Password { get; set; }
        [JsonIgnore] public UserBodyProporties UserBodyProporties { get; set; }
        [JsonIgnore] public Role Role { get; set; }
        [JsonIgnore] public List<Note> Notes { get; set; }
        [JsonIgnore] public List<Notification> Notifications { get; set; }
        [JsonIgnore] public List<UserTraining> TrainingsList { get; set; }
        [JsonIgnore] public List<UserAudiotape> UserAudiotapesList { get; set; }
    }
}
