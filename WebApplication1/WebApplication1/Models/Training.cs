using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Training
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string BodyPart { get; set; }
        public string GifURL { get; set; }
        [JsonIgnore] virtual public List<UserTraining> TrainingsList { get; set; }
        public Training()
        {
            TrainingsList = new List<UserTraining>();
        }
    }
}
