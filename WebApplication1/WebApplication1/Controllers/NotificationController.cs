using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data.Notifications;
using WebApplication1.Dtos.Notification;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("notification")]
    [ApiController]
    public class NotificationController : Controller
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationController(INotificationRepository notificationRepository) =>
            _notificationRepository = notificationRepository;

        [HttpPut("UpdatenNotification")]
        public IActionResult PutNotification([FromBody] NotificationDto dto)
        {
            return Ok(_notificationRepository.Update(new Notification()
            {
                Id = dto.Id,
                UserId = dto.UserId,
                Name = dto.Name,
                Date = dto.Date
            }));
        }
        [HttpPost("AddNotification")]
        public IActionResult AddNotification([FromBody] NotificationDto dto)
        {
            
                List<Notification> userNotifications = _notificationRepository.GetUserNotifications(dto.UserId);
                for (int i = 0; i < userNotifications.Count; i++)
                {
                    if (userNotifications[i].Name.Equals(dto.Name) && userNotifications[i].Date.Equals(dto.Date)) 
                        return BadRequest(new { message = "Такое напоминание уже существует!" });
                }
                if (dto.Name.Length < 5) return BadRequest(new { message = "Название напоминания слишком короткое!" });
                return Ok(_notificationRepository.Create(new Notification() {
                    Id = Guid.NewGuid(),
                    UserId = dto.UserId,
                    Date = dto.Date,
                    Name = dto.Name
                }));
           
        }
        [HttpDelete("DeleteNotification/{id}")]
        public IActionResult DeleteNotification(Guid id)
        {
            var check = _notificationRepository.Get(id);
            if (check == null) return BadRequest(new { message = "Такое напоминание не существует!" });
            _notificationRepository.Delete(id);
            return Ok(new { message = "Успешное удаление напоминания!" });

        }

        [HttpGet("GetUserNotifications/{userId}")]
        public IEnumerable<Notification> GetUserNotifications(Guid userId)
        {
            return _notificationRepository.GetUserNotifications(userId);
        }


        [HttpGet("GetNotificationById/{id}")]
        public Notification GetUserById(Guid id)
        {
            return _notificationRepository.Get(id);
        }
        
        [HttpGet("GetUserNotificationCount/{id}")]
        public int GetUserNotificationCount(Guid id)
        {
            return _notificationRepository.GetUserNotificationCount(id);
        }
    }
}
