using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Dtos
{
    public class AudiotapeDto
    {
        public string Id { get; set; }
        public string Author { get; set; }
        public string Name { get; set; }
        public IFormFile Image { get; set; }
        public IFormFile Mp3 { get; set; }
    }
}
