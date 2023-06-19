using Microsoft.AspNetCore.Http;

namespace WebApplication1.Models
{
    public class MusicUpload
    {
        public string Name { get; set; }
        public string Singer { get; set; }
        public string MusicSrc { get; set; }
        public IFormFile MusicFile { get; set; }
        public string CoverSrc { get; set; }
        public IFormFile CoverFile { get; set; }
    }
}
