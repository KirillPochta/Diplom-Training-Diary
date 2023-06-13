using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Picture
    {
        [Required]
        public string FileName { get; set; }

        [Required]
        public IFormFile FormFile { get; set; }
    }
}
