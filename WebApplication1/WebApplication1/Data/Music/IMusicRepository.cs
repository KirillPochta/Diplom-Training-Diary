using System.Collections.Generic;

namespace WebApplication1.Data.Music
{
    public interface IMusicRepository
    {
        public List<Models.Music> Get();
        public Models.Music GetMusicById(int id);
        public void Add(Models.Music music);
        public void Delete(int id);
    }
}
