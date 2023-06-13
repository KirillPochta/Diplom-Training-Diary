using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data.Music
{
    public interface IAudiotapeRepository
    {
        AudioTape Create(AudioTape audioTape);
        AudioTape Get(string id);
        UserAudiotape CreateUserAudiotape(UserAudiotape userAudiotape);
        List<UserAudiotape> GetUserAudiotapeIds(Guid userId);
        void Delete(string id);
        void Update(AudioTape training);
        List<AudioTape> GetUserAudiotapes(Guid userId);
        void DeleteUserAudiotape(Guid userId, string trainingId);
        AudioTape GetUserAudiotape(Guid userId, string trainingId);
        int GetUserAudiotapeCount(Guid id);
    }
}
