using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Dtos
{
    public class UserDto
    {
        public string FirstName { set; get; }
        public string LastName { set; get; }
        public string Email { set; get; }
        public string Password { set; get; }
        public string Gender { get; set; }
        public string Interests { get; set; }
        public string Country { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public int Chest { get; set; }
        public int Waist { get; set; }
        public int Hips { get; set; }
    }
}
