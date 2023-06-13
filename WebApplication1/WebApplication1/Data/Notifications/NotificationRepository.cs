using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data.Notifications
{
    public class NotificationRepository : INotificationRepository
    {
        public readonly CoreDbContext _context;
        public NotificationRepository(CoreDbContext context) =>
            _context = context;

        public Notification Create(Notification notification)
        {
            _context.Notifications.Add(notification);
            _context.SaveChanges();
            return notification;
        }

        public void Delete(Guid id)
        {
            string trainingName = _context.Notifications.FirstOrDefault(i => i.Id.Equals(id)).Name;
            _context.Notifications.Remove(_context.Notifications.FirstOrDefault(i => i.Id.Equals(id)));
            _context.SaveChanges();
        }

        public Notification Get(Guid id)
        {
            return _context.Notifications.FirstOrDefault(i => i.Id.Equals(id));
        }

        public int GetUserNotificationCount(Guid id)
        {
            return _context.Notifications.Where(i => i.UserId.Equals(id)).Count();
        }

        public List<Notification> GetUserNotifications(Guid userId)
        {
            return _context.Notifications.Where(i => i.UserId.Equals(userId)).ToList();
        }

        public Notification Update(Notification notification)
        {
            _context.Entry(notification).State = EntityState.Modified;
            _context.SaveChanges();
            return notification;
        }
    }
}
