using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Dtos.Notes;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("notes")]
    [ApiController]
    public class NotesController : Controller
    {
        private readonly INotesRepository _noteRepository;

        public NotesController(INotesRepository repository ) =>
                _noteRepository = repository;
        
        [HttpGet("GetNotes/{id}")]
        public int Get(Guid id)
        {
            return _noteRepository.GetCountOfUserNotes(id);
        }
        
        [HttpGet("GetNote/{id}")]
        public Note GetNoteById(Guid id)
        {
            return _noteRepository.GetNote(id);
        }
        
        [HttpGet("GetUserNotes/{id}")]
        public IEnumerable<Note> GetUserNote(Guid id)
        {
            return _noteRepository.GetNotes(id);
        }

        [HttpPost("AddNote")]
        public IActionResult PostNote([FromBody] NoteDto dto)
        {
            if(dto.Name.Length < 5) return BadRequest("Название заметки слишком короткое");
            if(dto.Body.Length < 5) return BadRequest("Содержимое заметки слишком короткое");
            
            return Created("Заметка создана!", _noteRepository.Create(new Note() { 
                Id = Guid.NewGuid(),
                Date = dto.Date,
                UserId = dto.UserId,
                Name = dto.Name,
                Body = dto.Body,
                color = dto.Color,
                Priority = dto.Priority,
                IsPinned = false,
                EventDate = dto.EventDate
            }));
        }

     
        [HttpPut("UpdateNote")]
        public IActionResult PutNote([FromBody] Note note)
        {
            return Ok(_noteRepository.Update(note));
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteNote(Guid id)
        {
            _noteRepository.Delete(id);
            return Ok(new { message = "Заметка успешно удалена" });
        }

        [HttpPut("PinNote/{id}")]
        public IActionResult SetPinOn(Guid id)
        {
            return Ok(_noteRepository.SetPinOnNote(id));
        }
    }
}
