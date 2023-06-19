using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data.Music
{
    public interface IAudiotapeRepository
    {
        Audiotape Create(Audiotape training);
        Audiotape Get(string id);
        UserAudiotape CreateUserAudiotape(UserAudiotape userAudiotape);
        List<UserAudiotape> GetUserAudiotapeIds(Guid userId);
        void Delete(string id);
        void Update(Audiotape training);
        List<Audiotape> GetUserAudiotapes(Guid userId);
        void DeleteUserAudiotape(Guid userId, string trainingId);
        Audiotape GetUserAudiotape(Guid userId, string trainingId);
        int GetUserAudiotapeCount(Guid id);
    }
}
