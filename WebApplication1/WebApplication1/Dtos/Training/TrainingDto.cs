using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Dtos.Training
{
    public class TrainingDto
    {
        public Guid UserId { get; set; }
        public string TrainingId { get; set; }
        public string Name { get; set; }
        public string BodyPart { get; set; }
        public string GifUrl { get; set; }
    }
}
