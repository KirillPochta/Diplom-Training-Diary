using System.Collections.Generic;
using System.Linq;

namespace WebApplication1.Data.Music
{
    public class MusicRepository : IMusicRepository
    {
        public readonly CoreDbContext _context;
        public MusicRepository(CoreDbContext context) =>
            _context = context;

        public List<Models.Music> Get() => _context.Musics.ToList();

        public void Add(Models.Music music) { _context.Musics.Add(music); _context.SaveChanges(); }

        public void Delete(int id)
        {
            _context.Musics.Remove(_context.Musics.FirstOrDefault(i => i.Id.Equals(id)));
            _context.SaveChanges();
        }

        public Models.Music GetMusicById(int id)
        {
            return _context.Musics.FirstOrDefault(i => i.Id.Equals(id));
        }
    }
}
