using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data
{

    public class UserRepository : IUserRepository
    {

        public readonly CoreDbContext _context;

        public UserRepository(CoreDbContext context) =>
            _context = context;

        public User Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }


        public void DeleteUser(Guid id)
        {
            _context.Users.Remove(_context.Users.FirstOrDefault(u => u.Id == id));
            _context.SaveChanges();
        }

        public User GetByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        public User GetById(Guid id)
        {
            return _context.Users.Include(u => u.UserBodyProporties).FirstOrDefault(u => u.Id == id);
        }

     

        public IEnumerable<User> GetUsers()
        {
            return _context.Users;
        }

        public void Update(User item)
        {
            _context.Entry(item).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
