using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public class NotesRepository : INotesRepository
    {
        public CoreDbContext _context;

        public NotesRepository(CoreDbContext context) =>
                _context = context;

        public Note Create(Note note)
        {
            _context.Notes.Add(note);
            _context.SaveChanges();
            return note;
        }

        public void Delete(Guid del)
        {
            
            Note item = _context.Notes.FirstOrDefault(id => id.Id == del);
            if (item != null)
            {
                _context.Notes.Remove(item);
                _context.SaveChanges();
            }
        }

        public Note GetNote(Guid get)
        {
            return _context.Notes.FirstOrDefault(id => id.Id == get);
        }

        public int GetCountOfUserNotes(Guid id)
        {
            return _context.Notes.Where(p =>p.UserId == id).Count();
        }
        public IEnumerable<Note> GetNotes(Guid id)
        {
            return _context.Notes.Where(i => i.UserId == id);
        }
        
        public Note Update(Note note)
        {
            _context.Entry(note).State = EntityState.Modified;
            _context.SaveChanges();
            return note;
        }

        public Note SetPinOnNote(Guid id)
        {
            Note note = _context.Notes.FirstOrDefault(p => p.Id == id);
            if (note.IsPinned)
            {
                note.IsPinned = false;
            }
            else
                note.IsPinned = true;
            _context.SaveChanges();
            return note;
        }
        
         
    }
}
