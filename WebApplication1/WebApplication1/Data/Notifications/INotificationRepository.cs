using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data.Notifications
{
    public interface INotificationRepository
    {
        Notification Create(Notification notification);
        Notification Get(Guid id);
        void Delete(Guid id);
        Notification Update(Notification notification);
        List<Notification> GetUserNotifications(Guid userId);
        int GetUserNotificationCount(Guid id);
    }
}
