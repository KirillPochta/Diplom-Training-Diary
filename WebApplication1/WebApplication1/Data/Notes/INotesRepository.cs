using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public interface INotesRepository
    {
        int GetCountOfUserNotes(Guid id);
        IEnumerable<Note> GetNotes(Guid id);
        Note GetNote(Guid id);
        Note Create(Note item);
        Note Update(Note item);
        void Delete(Guid id);
        Note SetPinOnNote(Guid id);
     }
}
