using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Data.Roles;
using WebApplication1.Data.UsersBodyProporties;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("user")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IUsersBodyProportiesRepository _bodyProportiesRepository;
        private readonly IUsersBodyProportiesRepository _bodyRepository;

        public UserController(IUserRepository repository, IRoleRepository roleRepository, IUsersBodyProportiesRepository usersBodyProportiesRepository) =>
                (_userRepository, _roleRepository, _bodyProportiesRepository) = (repository, roleRepository, usersBodyProportiesRepository);

        [HttpGet("GetAllUsers")]
        public IEnumerable<User> GetUsers()
        {
            return _userRepository.GetUsers();
        }
    
     
        [HttpGet("GetUserById/{id}")]
        public User GetUserById(Guid id)
        {
            return _userRepository.GetById(id);
        }
        
        [HttpGet("GetUserByEmail/{email}")]
        public User GetUserByEmail(string email)
        {
            return _userRepository.GetByEmail(email);
        }
      
          
        [HttpGet("GetUserBodyProporties/{id}")]
        public UserBodyProporties GetUserBodyProporties(Guid id)
        {
            return _bodyProportiesRepository.GetBodyProporties(id);
        }

        [HttpPut("UpdateBodyProportions")]
        public IActionResult UpdateProportions(UserBodyProporties userBodyProporties)
        {
            _bodyProportiesRepository.Update(userBodyProporties);
            return NoContent();
        }
        
        [HttpDelete("DeleteUser/{id}")]
        public IActionResult DeleteUser(Guid id)
        {
                _userRepository.DeleteUser(id);
                return Ok(new { message = "Успешное удаление пользователя" });
            
        }
         
        [HttpPost("AddUser")]
        public IActionResult AddUser(UserDto dto)
        {
            try
            {
                MailAddress adress = new MailAddress(dto.Email);
                var userCheck = _userRepository.GetByEmail(dto.Email);
                if (userCheck != null)
                    if (dto.Email == userCheck.Email)
                        return BadRequest(new { message = "Уже есть пользователь с такой почтой!" });
                if (String.IsNullOrEmpty(dto.FirstName))    return BadRequest("Имя не может быть пустым");
                DateTime birth = new DateTime(dto.Year, dto.Month, dto.Day);
                Role role = _roleRepository.GetRole();
                var user = new User
                {
                    Id = Guid.NewGuid(),
                    RoleId = role.Id,
                    FirstName = dto.LastName,
                    LastName = dto.LastName,
                    Email = dto.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                    Interests = dto.Interests,
                    Gender = dto.Gender,
                    Joined = DateTime.Now,
                    Birth = birth,
                    Country = dto.Country
                };
                var userBodyProporties = new UserBodyProporties
                {
                    Id = Guid.NewGuid(),
                    UserId = user.Id,
                    Weight = dto.Weight,
                    Waist = dto.Waist,
                    Chest = dto.Chest,
                    Height = dto.Height,
                    Hips = dto.Hips,
                    BodyMassIndex =(int)(dto.Weight / Math.Pow(dto.Height * 0.01, 2))
                };
                userBodyProporties.UserFatness = _bodyProportiesRepository.GetUserFatness(userBodyProporties.BodyMassIndex);
                userBodyProporties.User = user;
                user.UserBodyProporties = userBodyProporties;
                return Created("Успешная регистрация!", _userRepository.Create(user));
            }
            catch (Exception e)
            {
                return BadRequest("Проверьте вводимые данные!");

            }
        }

        [HttpPut("UpdateUser")]
        public IActionResult PutUser([FromBody] User user)
        {
            _userRepository.Update(user);
            return Ok(user);
        }
     }
}
