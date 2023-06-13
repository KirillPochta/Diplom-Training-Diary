using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data.NoteData
{
    public interface ITagRepository
    {
        Tag AddTagOnNote(Guid noteId, String tagName);
        IEnumerable<Tag> GetNoteTags(Guid id);
        Tag GetTagById(Guid id);
        Tag GetTagByName(String name);
        void UpdateTag(Tag tag);
        void DeleteTag(Guid id);
    }
}
