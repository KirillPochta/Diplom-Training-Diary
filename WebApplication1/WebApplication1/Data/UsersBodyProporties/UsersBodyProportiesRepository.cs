using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Data.UsersBodyProporties
{
    
    public class UsersBodyProportiesRepository : IUsersBodyProportiesRepository
    {   
        public readonly string[] activitys = new string[] { "Малоподвижный",
                                                            "Тренировки 1-3 раза в неделю",
                                                            "Тренировки 3-5 раза в неделю",
                                                            "Высокие нагрузки каждый день",
                                                            "Экстремальные нагрузки" };
        public readonly string[] goals = new string[] { "Сбросить вес",
                                                        "Набрать мышечную массу",
                                                        "Поддерживать вес" };
        public readonly CoreDbContext _context;
        public UsersBodyProportiesRepository(CoreDbContext context) =>
            _context = context;
        public UserBodyProporties Create(UserBodyProporties bProp)
        {
            _context.UsersBodyProporties.Add(bProp);
            _context.SaveChanges();
            return bProp;         
        }
        
        public UserBodyProporties GetBodyProporties(Guid id)
        {
            return GetUseruserBodyProporties(id);
        }

        public void Update(UserBodyProporties bProp)
        {
            bProp.BodyMassIndex = (int)(bProp.Weight / Math.Pow(bProp.Height * 0.01, 2));
            bProp.UserFatness = GetUserFatness(bProp.BodyMassIndex);
            _context.Entry(bProp).State = EntityState.Modified;
            _context.SaveChanges();
        }
        public int GetAge(DateTime dob)
        {
            DateTime today = DateTime.Today;
            int months = today.Month - dob.Month;
            int years = today.Year - dob.Year;
            if (today.Day < dob.Day)
            {
                months--;
            }
            if (months < 0)
            {
                years--;
            }
            return years;
        }
        public string GetUserFatness(double bodyIndex)
        {
            if (bodyIndex <= 16) return "Выраженный дефицит массы тела";
            else if (bodyIndex >= 16 && bodyIndex <= 18.5) return "Недостаточная (дефицит) масса тела";
            else if (bodyIndex >= 18.5 && bodyIndex <= 25) return "Норма";
            else if (bodyIndex >= 25 && bodyIndex <= 30) return "Избыточная масса тела (предожирение)";
            else if (bodyIndex >= 30 && bodyIndex <= 35) return "Ожирение 1 степени";
            else if (bodyIndex >= 35 && bodyIndex <= 40) return "Ожирение 2 степени";
            else if (bodyIndex >= 40 && bodyIndex <= 50) return "Ожирение 3 степени";
            return "Избыточная масса тела (предожирение)";
        }
        public UserBodyProporties GetUseruserBodyProporties(Guid id)
        {
            UserBodyProporties userBodyProporties = _context.UsersBodyProporties.FirstOrDefault(i => i.UserId.Equals(id));
            User user = _context.Users.FirstOrDefault(i => i.Id.Equals(id));
            double activityVar = 0;
            if (activitys[0].Equals(userBodyProporties.Activity)) activityVar = 1.2;
            else if (activitys[1].Equals(userBodyProporties.Activity)) activityVar = 1.375;
            else if (activitys[2].Equals(userBodyProporties.Activity)) activityVar = 1.55;
            else if (activitys[3].Equals(userBodyProporties.Activity)) activityVar = 1.7;
            else if (activitys[4].Equals(userBodyProporties.Activity)) activityVar = 1.9;
            int age = DateTime.Now.Year - user.Birth.Year;
            if (user.Gender.Equals("Male"))
            {
                userBodyProporties.DailyNormalCaloriesMiffanSanJeora = (int)((10 * userBodyProporties.Weight + 6.26 * userBodyProporties.Height - 5 * GetAge(user.Birth) + 5) * activityVar);
                userBodyProporties.DailyNormalCaloriesHarrisMenedict = (int)((88.362 + (13.397 * userBodyProporties.Weight) + (4.799 * userBodyProporties.Height) - (5.677 * GetAge(user.Birth))) * activityVar);
            }
            else
            {
                userBodyProporties.DailyNormalCaloriesMiffanSanJeora = (int)((10 * userBodyProporties.Weight + 6.25 * userBodyProporties.Height - 5 * GetAge(user.Birth) - 161) * activityVar);
                userBodyProporties.DailyNormalCaloriesHarrisMenedict = (int)((444.593 + (9.247 * userBodyProporties.Weight) + (3.098 * userBodyProporties.Height) - (4.330 * GetAge(user.Birth))) * activityVar);
            }
            if (goals[0].Equals(userBodyProporties.Goal)) // сбросить вес
            {
                userBodyProporties.DailyBelok = (int)(userBodyProporties.DailyNormalCaloriesHarrisMenedict * 0.3 / 4);
                userBodyProporties.DailyJir = (int)(userBodyProporties.DailyNormalCaloriesHarrisMenedict * 0.2 / 9);
                userBodyProporties.DailyYglevod = (int)(userBodyProporties.DailyNormalCaloriesHarrisMenedict * 0.5 / 4);
            }
            else
            { // поддержание массы или набора массы
                userBodyProporties.DailyBelok = (int)(userBodyProporties.DailyNormalCaloriesHarrisMenedict * 0.3 / 4);
                userBodyProporties.DailyJir = (int)(userBodyProporties.DailyNormalCaloriesHarrisMenedict * 0.3 / 9);
                userBodyProporties.DailyYglevod = (int)(userBodyProporties.DailyNormalCaloriesHarrisMenedict * 0.4 / 4);
            }

            return userBodyProporties;
        }
    }
}
