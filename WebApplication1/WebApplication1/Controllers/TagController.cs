using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Data.NoteData;
using WebApplication1.Dtos.Tag;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("tag")]
    [ApiController]
    public class TagController : Controller
    {
        private readonly ITagRepository _tagRepository;
        private readonly INotesRepository  _noteRepository;

        public TagController(ITagRepository tagRepository, INotesRepository noteRepository) =>
                (_tagRepository, _noteRepository) = (tagRepository, noteRepository);

        [HttpGet("GetNoteTags/{id}")]
        public IEnumerable<Tag> GetTags(Guid id)
        {
            return _tagRepository.GetNoteTags(id);
        }

        [HttpGet("GetTag/{id}")]
        public IActionResult GetTag(Guid id)
        {
            var tagNote = _tagRepository.GetTagById(id);
            if(tagNote == null)
            {
                return BadRequest(new { message = "Такого тега нет!" });
            }
            return Ok(tagNote);
        }
        
        

        [HttpPost("AddTag")]
        public IActionResult AddTag([FromBody] TagDto dto)
        {
             
            List<Tag> userTags = _tagRepository.GetNoteTags(dto.NoteId).ToList();
            bool existance = true;
            if (userTags.Count.Equals(0)) existance = false;
            else
            {
                for (int i = 0; i < userTags.Count; i++)
                {
                    if (userTags[i].NameTag == dto.tagName)
                    {
                        existance = true;
                        break;
                    }
                    else
                        existance = false;
                }
            }
            if (existance)
            {
                return BadRequest(new { message = "Такой тег уже существует на текущей заметке!" });
            }
            else
            {
                if (dto.tagName.Length < 5 || String.IsNullOrEmpty(dto.tagName))
                {
                    return BadRequest("Название тега короткое или пустое!");
                }
                else
                {
                    
                    return Created("Тег создан!", _tagRepository.AddTagOnNote(dto.NoteId, dto.tagName));
                }
            }
        } 


        [HttpPut("UpdateNoteTag/")]
        public IActionResult PutTag([FromBody] Tag tag)
        {
            _tagRepository.UpdateTag(tag);
            return Ok(new { message = "Тег успешно обнавлен!" });
        }

        [HttpDelete("DeleteTag/{id}")]
        public IActionResult DeleteTag(Guid id)
        {
            var tagForDelete = _tagRepository.GetTagById(id);
            if (tagForDelete == null)
            {
                return BadRequest(new { message = "Такого тега нет!" });
            }
            else
            {
                _tagRepository.DeleteTag(id);
                return Ok(new { message = "Тег успешно удален" });
            }
        }
    }
}
