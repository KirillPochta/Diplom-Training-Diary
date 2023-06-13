using Newtonsoft.Json;
using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
        [JsonIgnore] public virtual List<User> Users { get; set; }

        public Role() {
            Users = new List<User>();
        }
    }
}
