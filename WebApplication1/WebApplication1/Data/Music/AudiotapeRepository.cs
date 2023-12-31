﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data.Music
{
    public class AudiotapeRepository : IAudiotapeRepository
    {
        public readonly CoreDbContext _context;
        public AudiotapeRepository(CoreDbContext context) =>
            _context = context;

        public Audiotape Create(Audiotape audiotape)
        {
            _context.Add(audiotape);
            _context.SaveChanges();
            return audiotape;
        }

        public UserAudiotape CreateUserAudiotape(UserAudiotape userAudiotape)
        {
            _context.UserAudiotapes.Add(userAudiotape);
            _context.SaveChanges();
            return userAudiotape;
        }

        public void Delete(string id)
        {
             _context.Audiotapes.Remove(_context.Audiotapes.FirstOrDefault(i => i.Id.Equals(id)));
            _context.SaveChanges();
        }

        public void DeleteUserAudiotape(Guid userId, string audiotapeId)
        {
            _context.UserAudiotapes.Remove(
                _context.UserAudiotapes.FirstOrDefault(i => i.UserId.Equals(userId) && i.AudiotapeId.Equals(audiotapeId)));
            _context.SaveChanges();
        }

        public Audiotape Get(string id)
        {
            return _context.Audiotapes.FirstOrDefault(i => i.Id.Equals(id));
        }

        public Audiotape GetUserAudiotape(Guid userId, string audiotapeId)
        {
            UserAudiotape userAudiotape = _context.UserAudiotapes.FirstOrDefault(i => i.UserId.Equals(userId) && i.AudiotapeId.Equals(audiotapeId));
            Audiotape audiotape = _context.Audiotapes.FirstOrDefault(i => i.Id.Equals(userAudiotape.AudiotapeId));
            return audiotape;
        }


        public List<Audiotape> GetUserAudiotapes(Guid userId)
        {
            List<UserAudiotape> userAudiotapes = _context.UserAudiotapes.Where(i => i.UserId.Equals(userId)).ToList();
            List<Audiotape> audiotapes = new List<Audiotape>();
            for (int i = 0; i < userAudiotapes.Count; i++)
            {
                audiotapes.Add(_context.Audiotapes.FirstOrDefault(j => j.Id.Equals(userAudiotapes[i].AudiotapeId)));
            }
            return audiotapes;
        }
        public List<UserAudiotape> GetUserAudiotapeIds(Guid userId)
        {
            return _context.UserAudiotapes.Where(i => i.UserId.Equals(userId)).ToList();
        }
        public int GetUserAudiotapeCount(Guid id)
        {
            return _context.UserAudiotapes.Where(i => i.UserId.Equals(id)).Count();
        }

        public void Update(Audiotape audiotape)
        {
            _context.Entry(audiotape).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
