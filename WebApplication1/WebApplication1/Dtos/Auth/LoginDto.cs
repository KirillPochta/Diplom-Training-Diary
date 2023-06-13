using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Dtos
{
    public class LoginDto
    {
        /// <summary>
        /// user email
        /// </summary>
        /// <example>admin1@as.com</example>
        public string Email { set; get; }
        /// <summary>
        /// user pass
        /// </summary>
        /// <example>a2</example>
        public string Password { set; get; }
        
    }
}

