using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data.Trainings
{
    public class TrainingRepository : ITrainingRepository
    {
        public readonly CoreDbContext _context;
        public TrainingRepository(CoreDbContext context) =>
            _context = context;

        public Training Create(Training training)
        {
            _context.Add(training);
            _context.SaveChanges();
            return training;
        }
        
        public UserTraining CreateUserTraining(UserTraining userTraining)
        {
            _context.UserTrainings.Add(userTraining);
            _context.SaveChanges();
            return userTraining;
        }

        public void Delete(string id)
        {
            _context.Trainings.Remove(_context.Trainings.FirstOrDefault(i => i.Id.Equals(id)));
            _context.SaveChanges();
        }

        public void DeleteUserTraining(Guid userId, string trainingId)
        {
            _context.UserTrainings.Remove(
                _context.UserTrainings.FirstOrDefault(i => i.UserId.Equals(userId) && i.TrainingId.Equals(trainingId)));
            _context.SaveChanges();
        }

        public Training Get(string id)
        {
            return _context.Trainings.FirstOrDefault(i => i.Id.Equals(id));
        }

        public Training GetUserTraining(Guid userId, string trainingId)
        {
            UserTraining userTraining = _context.UserTrainings.FirstOrDefault(i => i.UserId.Equals(userId) && i.TrainingId.Equals(trainingId));
            Training training = _context.Trainings.FirstOrDefault(i => i.Id.Equals(userTraining.TrainingId));
            return training;
        }

         
        public List<Training> GetUserTrainings(Guid userId)
        {
            List<UserTraining> userTrainings = _context.UserTrainings.Where(i => i.UserId.Equals(userId)).ToList();
            List<Training> trainings = new List<Training>();
            for (int i = 0; i < userTrainings.Count; i++)
            {
                trainings.Add(_context.Trainings.FirstOrDefault(j => j.Id.Equals(userTrainings[i].TrainingId)));
            }
            return trainings;
        }
        public List<UserTraining> GetUserTrainingIds(Guid userId)
        {
            return _context.UserTrainings.Where(i => i.UserId.Equals(userId)).ToList();
        }
        public int GetUserTrainingCount(Guid id)
        {
            return _context.UserTrainings.Where(i => i.UserId.Equals(id)).Count();
        }

        public void Update(Training training)
        {
            _context.Entry(training).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
