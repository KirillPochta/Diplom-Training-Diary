using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using WebApplication1.Data.Music;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("music")]
    [ApiController]
    public class AudiotapeController : Controller
    {
        private readonly IAudiotapeRepository _musicRepository;

        public AudiotapeController(IAudiotapeRepository musicRepository) =>
            _musicRepository = musicRepository;

        [HttpPut("UpdatenAudiotape")]
        public IActionResult PutAudiotape([FromBody] Audiotape music)
        {
            _musicRepository.Update(music);
            return Ok(music);
        }

        [HttpPost("AddAudiotape")]
        public IActionResult AddAudiotape([FromBody] AudiotapeDto dto)
        {
            try
            {
                if (dto.Name.Length < 4) return BadRequest(new { message = "Название слишком короткое!" });
                if (dto.Author.Length < 4) return BadRequest(new { message = "Имя автора слишком короткое!" });
                return Created("Песня создана!", _musicRepository.Create(new Audiotape()
                {
                    Id = dto.Id,
                    Name = dto.Name,
                    Author = dto.Author,
                    Duration = dto.Duration
                }));
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Проверьте введенные данные!" });
            }
        }

        [HttpPost("AddUserAudiotape")]
        public IActionResult AddUserAudiotape([FromBody] AudiotapeDto dto)
        {
            List<UserAudiotape> userAudiotapes = _musicRepository.GetUserAudiotapeIds(dto.UserId);
            for (int i = 0; i < userAudiotapes.Count; i++)
            {
                if (userAudiotapes[i].AudiotapeId.Equals(dto.AudiotapeId)) return BadRequest(new { msg = "Вы уже добавили такою песню!" });
            }
            return Created("Песня добавлено в ваш кабинет!", _musicRepository.CreateUserAudiotape(new UserAudiotape()
            {
                Id = Guid.NewGuid(),
                UserId = dto.UserId,
                AudiotapeId = dto.AudiotapeId
            }));
        }
        [HttpDelete("DeleteAudiotape/{id}")]
        public IActionResult DeleteAudiotape(string id)
        {
            _musicRepository.Delete(id);
            return Ok(new { message = "Песня удалена!" });

        }

        [HttpDelete("DeleteUserAudiotape")]
        public IActionResult DeleteUserAudiotape([FromBody] AudiotapeDto dto)
        {
            try
            {
                _musicRepository.DeleteUserAudiotape(dto.UserId, dto.AudiotapeId);
                return Ok(new { message = "Песня удалена!" });
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Такой песни у вас больше нет!" });
            }
        }


        [HttpGet("GetAudiotapeById/{id}")]
        public Models.Audiotape GetAudiotapeById(string id)
        {
            return _musicRepository.Get(id);
        }

        [HttpGet("GetUserAudiotapes/{id}")]
        public IEnumerable<Models.Audiotape> GetUserAudiotapes(Guid id)
        {
            return _musicRepository.GetUserAudiotapes(id);
        }
        [HttpGet("GetUserAudiotape")]
        public Models.Audiotape GetUserAudiotape([FromBody] Dtos.AudiotapeDto dto)
        {
            return _musicRepository.GetUserAudiotape(dto.UserId, dto.AudiotapeId);
        }

        [HttpGet("GetUserAudiotapeCount/{id}")]
        public int GetUserAudiotapeCount(Guid id)
        {
            return _musicRepository.GetUserAudiotapeCount(id);
        }
    }
}