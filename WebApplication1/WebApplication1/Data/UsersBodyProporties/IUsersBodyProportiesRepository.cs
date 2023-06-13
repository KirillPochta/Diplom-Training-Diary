using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data.UsersBodyProporties
{
    public interface IUsersBodyProportiesRepository
    {
        UserBodyProporties Create(UserBodyProporties bProp);
        void Update(UserBodyProporties bProp);
        UserBodyProporties GetBodyProporties(Guid id);
        string GetUserFatness(double bodyIndex);
    }
}
