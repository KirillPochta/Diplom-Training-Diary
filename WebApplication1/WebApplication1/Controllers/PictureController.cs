using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        [HttpGet("{filename}")]
        [Produces("image/jpeg", "application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Get(string filename)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", filename);
            FileStream stream;
            try
            {
                stream = new(path, FileMode.Open);
            }
            catch
            {
                return NotFound(new { message = "Image not found" });
            }
            return File(stream, "image/jpeg");
        }

        [HttpPost("{id}")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Post([FromForm] Picture file, Guid id,
            [FromServices] IUserRepository userRepository)
        {
            var user = userRepository.GetById(id);
            if (user is null)
                return NotFound(new { message = "Product not found" });

            if (ModelState.IsValid)
            {
                var dirPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                if(!Directory.Exists(dirPath))
                    Directory.CreateDirectory(dirPath);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.FileName);
                using FileStream stream = new(filePath, FileMode.Create);
                file.FormFile.CopyTo(stream);

                user.Image = file.FileName;
                userRepository.Update(user);

                return Ok();
            }

            return BadRequest(ModelState);
        }
    }
}
