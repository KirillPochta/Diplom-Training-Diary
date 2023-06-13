using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data.NoteData
{
    public class TagRepository : ITagRepository
    {
        public CoreDbContext _context;
        public TagRepository(CoreDbContext context) =>
                _context = context;
         

        public Tag AddTagOnNote(Guid noteId, String tagName)
        {
            List<TagsNote> tagsNotes = _context.TagsNote.Where(i => i.NoteId == noteId).ToList();
            Tag tag = new Tag()
            {
                Id = Guid.NewGuid(),
                NameTag = tagName
            };
            TagsNote tagsNote = new TagsNote()
            {
                Id = Guid.NewGuid(),
                TagId = tag.Id,
                NoteId = noteId
            };
            _context.Tags.Add(tag);
            _context.TagsNote.Add(tagsNote);
            _context.SaveChanges();
            return tag;
        }

        public void DeleteTag(Guid id)
        {
            _context.Tags.Remove(_context.Tags.FirstOrDefault(i => i.Id == id));
            _context.SaveChanges();
        }

        public Tag GetTagById(Guid id)
        {
            return _context.Tags.FirstOrDefault(i => i.Id == id);
        }

       
        public void UpdateTag(Tag tagNote)
        {
            _context.Entry(tagNote).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public IEnumerable<Tag> GetNoteTags(Guid id)
        {
            List<TagsNote> tagsOnNote = _context.TagsNote.Where(i => i.NoteId.Equals(id)).ToList();
            List<Tag> tags = new List<Tag>();
            Tag tag;
            for (int i = 0; i < tagsOnNote.Count(); i++)
            {
                tag = _context.Tags.FirstOrDefault(j => j.Id == tagsOnNote[i].TagId);
                if (!tag.Equals(null)) tags.Add(tag);
            }
            return tags.ToList();
        }
 

        public Tag GetTagByName(string name)
        { 
            return _context.Tags.FirstOrDefault(i => i.NameTag == name);
        }

        
    }
}
