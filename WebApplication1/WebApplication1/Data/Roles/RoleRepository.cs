using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data.Roles
{
    public class RoleRepository : IRoleRepository
    {
        public readonly CoreDbContext _context;
        public RoleRepository(CoreDbContext context) =>
            _context = context;
        public Role GetRole()
        {
            return _context.Roles.FirstOrDefault(p => p.RoleName == "User");
        }

        public int GetRoleIdByRoleName(string name)
        {
            return _context.Roles.FirstOrDefault(i => i.RoleName.Equals(name)).Id;
        }

        

        public bool RoleThere(string RoleName)
        {
            if (_context.Roles.FirstOrDefault(i => i.RoleName.Equals(RoleName)).Equals(null)) return false;
            else return true;
        }

       
    }
}
