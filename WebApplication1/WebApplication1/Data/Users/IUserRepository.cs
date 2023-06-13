using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data
{
    public interface IUserRepository
    {
        void DeleteUser(Guid user);
        User Create(User user);
        void Update(User user);
        IEnumerable<User> GetUsers();
        User GetByEmail(string email);
        User GetById(Guid id);
    }
}
