using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mail;
using WebApplication1.Data;
using WebApplication1.Data.Roles;
using WebApplication1.Data.UsersBodyProporties;
using WebApplication1.Dtos;
using WebApplication1.Helpers;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IUsersBodyProportiesRepository _bodyProportiesRepository;
        private readonly JwtService _jwtService;

        public AuthController(IUserRepository userRepository, JwtService jwtService, IRoleRepository roleRepository, IUsersBodyProportiesRepository usersBodyProporties) 
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _bodyProportiesRepository = usersBodyProporties;
            _jwtService = jwtService;
        }
        /// <summary>
        /// user registration
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            try
            { 
                DateTime birth = new DateTime(dto.Year, dto.Month, dto.Day);
                Role role = _roleRepository.GetRole();
                var user = new User {
                    Id = Guid.NewGuid(),
                    RoleId = role.Id,
                    FirstName = dto.FirstName,
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
                    BodyMassIndex = (int)(dto.Weight / Math.Pow(dto.Height * 0.01, 2)),
                    Goal = dto.Goal,
                    Activity = dto.Activity
                };
                userBodyProporties.UserFatness = _bodyProportiesRepository.GetUserFatness(userBodyProporties.BodyMassIndex);
                userBodyProporties.User = user;
                user.UserBodyProporties = userBodyProporties;
                var userCheck = _userRepository.GetByEmail(dto.Email);
                if (userCheck != null) 
                    if (user.Email == userCheck.Email)
                        return BadRequest(new { message = "Уже есть пользователь с такой почтой!" });
                return Created("Успешная регистрация!", _userRepository.Create(user));
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Проверьте вводимые данные!" });
            }
        }
        /// <summary>
        /// user login 
        /// </summary>
        /// <param name="dto"></param>
        /// <returns>ok or bad request</returns>
        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _userRepository.GetByEmail(dto.Email);

            if (user == null) return BadRequest(new { message = "Некорректный имэил!" });

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Некорректный пароль!" });
            }
            var jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = false,
                SameSite = SameSiteMode.None,
                Secure = true
            });

            return Ok(user);
        }
        /// <summary>
        /// varify user authorization
        /// </summary>
        /// <returns> 200 or 401</returns>
        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                Guid userId = Guid.Parse(token.Issuer);

                var user = _userRepository.GetById(userId);

                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized(new { message = "Вы не авторизованы!"});
            }
        }
        /// <summary>
        /// user log out
        /// </summary>
        /// <returns>message oK</returns>
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            if(Request.Cookies["jwt"] != null)
            {
                Response.Cookies.Append("jwt", "", new CookieOptions
                {
                    Expires = DateTime.Now.AddDays(-1d),
                    HttpOnly = false,
                    SameSite = SameSiteMode.None,
                    Secure = true
                });
            }
            return Ok(new
            {
                message = "Успещный выход!"
            });
        }
    }
}
