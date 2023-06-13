using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data.Trainings
{
    public interface ITrainingRepository
    {
        Training Create(Training training);
        Training Get(string id);
        UserTraining CreateUserTraining(UserTraining userTraining);
        List<UserTraining> GetUserTrainingIds(Guid userId);
        void Delete(string id);
        void Update(Training training);
        List<Training> GetUserTrainings(Guid userId);
        void DeleteUserTraining(Guid userId, string trainingId);
        Training GetUserTraining(Guid userId, string trainingId);
        int GetUserTrainingCount(Guid id);
    }
}
