using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data.Trainings;
using WebApplication1.Dtos.Training;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("training")]
    [ApiController]
    public class TrainingController : Controller
    {
        private readonly ITrainingRepository _trainingRepository;

        public TrainingController(ITrainingRepository trainingRepository) =>
            _trainingRepository = trainingRepository;

        [HttpPut("UpdatenTraining")]
        public IActionResult PutTraining([FromBody] Training training)
        {
            _trainingRepository.Update(training);
            return Ok(training);
        }

        [HttpPost("AddTraining")]
        public IActionResult AddTraining([FromBody] TrainingDto dto)
        {
            try
            {
                if (dto.Name.Length < 5) return BadRequest(new { message = "Название упражнения слишком короткое!" });
                if (dto.BodyPart.Length < 10) return BadRequest(new { message = "Описание упражнения слишком короткое!" });
                return Created("Управжнение создано!", _trainingRepository.Create(new Training()
                {
                    Id = dto.TrainingId,
                    Name = dto.Name,
                    BodyPart = dto.BodyPart,
                    GifURL = dto.GifUrl
                }));
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Проверьте введенные данные!" });
            }
        }
        
        [HttpPost("AddUserTraining")]
        public IActionResult AddUserTraining([FromBody] TrainingDto dto)
        {
            List<UserTraining> userTrainings = _trainingRepository.GetUserTrainingIds(dto.UserId);
            for (int i = 0; i < userTrainings.Count; i++)
            {
                if (userTrainings[i].TrainingId.Equals(dto.TrainingId)) return BadRequest(new { msg = "Вы уже добавили такое упражнение!" });
            }
            if (_trainingRepository.Get(dto.TrainingId) is null)
            {
                _trainingRepository.Create(new()
                {
                    Id = dto.TrainingId,
                    Name = dto.Name,
                    BodyPart = dto.BodyPart,
                    GifURL = dto.GifUrl
                });
            }
            return Created("Упражнение добавлено в ваш кабинет!", _trainingRepository.CreateUserTraining(new UserTraining()
            {
                UserId = dto.UserId,
                TrainingId = dto.TrainingId
            }));
        }
        [HttpDelete("DeleteTraining/{id}")]
        public IActionResult DeleteTraining(string id)
        {
            _trainingRepository.Delete(id);
            return Ok(new { message = "Упражнение удалено!" });

        }
        
        [HttpDelete("DeleteUserTraining")]
        public IActionResult DeleteUserTraining([FromBody] TrainingDto dto)
        {
            try
            {
                _trainingRepository.DeleteUserTraining(dto.UserId, dto.TrainingId);
                return Ok(new { message = "Упражнение удалено!" });
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Такого упражнения у вас больше нет!" });
            }
             
        }

        
        [HttpGet("GetTrainingById/{id}")]
        public Training GetTrainingById(string id)
        {
            return _trainingRepository.Get(id);
        }

        [HttpGet("GetUserTrainings/{id}")]
        public IEnumerable<Training> GetUserTrainings(Guid id)
        {
            return _trainingRepository.GetUserTrainings(id);
        }
        [HttpGet("GetUserTraining")]
        public Training GetUserTraining([FromBody] TrainingDto dto)
        {
            return _trainingRepository.GetUserTraining(dto.UserId, dto.TrainingId);
        }

        [HttpGet("GetUserTrainingCount/{id}")]
        public int GetUserTrainingCount(Guid id)
        {
            return _trainingRepository.GetUserTrainingCount(id);
        }
    }
}
