using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data.Food
{
    public interface IMealRepository
    {
        List<Meal> GetFoods();
        List<UserMeal> GetUserMeals(Guid id);
        void DeleteUserMeal(Guid id);
        UserMeal AddUserMeal(Guid id);
    }
}
