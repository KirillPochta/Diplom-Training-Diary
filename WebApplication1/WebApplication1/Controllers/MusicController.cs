using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using WebApplication1.Data.Music;
using WebApplication1.Models;
using static System.Net.WebRequestMethods;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MusicController : ControllerBase
    {
        private readonly IMusicRepository _musicRepository;
        public MusicController(IMusicRepository music) => _musicRepository = music;
        [HttpGet("GetAudioTapes")]
        public List<Music> Get([FromServices] IMusicRepository musicRepository)
        {
            return musicRepository.Get();
        }

        [HttpGet("{filename}")]
        [Produces("audio/mpeg", "application/json")]
        public IActionResult Get(string filename)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", filename);
            FileStream stream;
            try
            {
                stream = new(path, FileMode.Open);
            }
            catch
            {
                return NotFound(new { message = "audio not found" });
            }
            return File(stream, "audio/mpeg");
        }
        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id) {
            Music  music = _musicRepository.GetMusicById(id);
            string[] splitedCover = music.Cover.Split('/');
            string[] splitedMp3 = music.Cover.Split('/');
            string pathToCover = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", Path.GetFileName(music.Cover));
            string pathToMp3 = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", Path.GetFileName(music.MusicSrc));
            if (System.IO.File.Exists(pathToCover) && System.IO.File.Exists(pathToMp3))
            {
        
                System.IO.File.Delete(pathToCover);
                System.IO.File.Delete(pathToMp3);

                return Ok($"Файл {music} успешно удален");
            }
            _musicRepository.Delete(id);
            return Ok();
        }
        [HttpPost]
        public IActionResult Post([FromForm] MusicUpload musicUpload, [FromServices] IMusicRepository musicRepository)
        {
            while (musicUpload.CoverFile.Name.Contains(' ')) musicUpload.CoverFile.Name.Replace(" ", "");
            var dirPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            if (!Directory.Exists(dirPath))
                Directory.CreateDirectory(dirPath);
            
            var coverPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", musicUpload.CoverSrc);
            using FileStream coverStream = new(coverPath, FileMode.Create);
            musicUpload.CoverFile.CopyTo(coverStream);

            var musicPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", musicUpload.MusicSrc);
            using FileStream musicStream = new(musicPath, FileMode.Create);
            musicUpload.MusicFile.CopyTo(musicStream);

            musicRepository.Add(new Music
            {
                MusicSrc = "https://localhost:44366/api/music/" + musicUpload.MusicSrc,
                Singer = musicUpload.Singer,
                Cover = "https://localhost:44366/api/picture/" + musicUpload.CoverSrc,
                Name = musicUpload.Name
            });

            return Ok();
        }
    }
}
