using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Data.Music;
using WebApplication1.Dtos;
using WebApplication1.Models;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace WebApplication1.Controllers
{
    [Route("audioTape")]
    [ApiController]
    public class AudiotapeController : Controller
    {
        private readonly IAudiotapeRepository _musicRepository;

        public AudiotapeController(IAudiotapeRepository musicRepository) =>
            _musicRepository = musicRepository;

        [HttpPut("UpdatenAudiotape")]
        public IActionResult PutAudiotape([FromBody] AudioTape music)
        {
            _musicRepository.Update(music);
            return Ok(music);
        }
        [HttpPost("AddAudiotape")]
        public async Task<IActionResult> AddAudiotape([FromForm] AudiotapeDto dto)
        {
            if (dto is null || dto.Image is null || dto.Mp3 is null)
            {
                return BadRequest("Некорректные данные запроса.");
            }
            
           
            _musicRepository.Create(new AudioTape()
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Author = dto.Author,
                Image = await GetByteArray(dto.Image),
                Mp3 = await GetByteArray(dto.Mp3)
            });
            return Ok(new { message = "Успешное добавление аудиозаписи!" });

        }
        private async Task<byte[]> GetByteArray(IFormFile file)
        {
            using MemoryStream stream = new();
            await file.CopyToAsync(stream);
            byte[] bytesArray = stream.ToArray();

            return bytesArray;
        }
        //[HttpPost("AddUserAudiotape")]
        //public IActionResult AddUserAudiotape([FromBody] AudiotapeDto dto)
        //{
        //    List<UserAudiotape> userAudiotapes = _musicRepository.GetUserAudiotapeIds(dto.UserId);
        //    for (int i = 0; i < userAudiotapes.Count; i++)
        //    {
        //        if (userAudiotapes[i].AudiotapeId.Equals(dto.AudiotapeId)) return BadRequest(new { msg = "Вы уже добавили такою песню!" });
        //    }
        //    return Created("Песня добавлено в ваш кабинет!", _musicRepository.CreateUserAudiotape(new UserAudiotape()
        //    {
        //        Id = Guid.NewGuid(),
        //        UserId = dto.UserId,
        //        AudiotapeId = dto.AudiotapeId
        //    }));
        //}
        [HttpDelete("DeleteAudiotape/{id}")]
        public IActionResult DeleteAudiotape(string id)
        {
            _musicRepository.Delete(id);
            return Ok(new { message = "Песня удалена!" });

        }

        //[HttpDelete("DeleteUserAudiotape")]
        //public IActionResult DeleteUserAudiotape([FromBody] AudiotapeDto dto)
        //{
        //    try
        //    {
        //        _musicRepository.DeleteUserAudiotape(dto.UserId, dto.AudiotapeId);
        //        return Ok(new { message = "Песня удалена!" });
        //    }
        //    catch (Exception)
        //    {
        //        return BadRequest(new { message = "Такой песни у вас больше нет!" });
        //    }
        //}


        [HttpGet("GetAudiotapeById/{id}")]
        public Models.AudioTape GetAudiotapeById(string id)
        {
            return _musicRepository.Get(id);
        }

        [HttpGet("GetUserAudiotapes/{id}")]
        public IEnumerable<AudioTape> GetUserAudiotapes(Guid id)
        {
            return _musicRepository.GetUserAudiotapes(id);
        }
        //[HttpGet("GetUserAudiotape")]
        //public Models.Audiotape GetUserAudiotape([FromBody] Dtos.AudiotapeDto dto)
        //{
        //    return _musicRepository.GetUserAudiotape(dto.UserId, dto.AudiotapeId);
        //}

        [HttpGet("GetUserAudiotapeCount/{id}")]
        public int GetUserAudiotapeCount(Guid id)
        {
            return _musicRepository.GetUserAudiotapeCount(id);
        }
    }
}