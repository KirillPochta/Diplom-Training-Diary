using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Dtos
{
    public class AudiotapeDto
    {
        public string Id { get; set; }
        public string AudiotapeId { get; set; }
        public string Author { get; set; }
        public string Name { get; set; }
        public double Duration { get; set; }
        public Guid UserId { get; set; }

    }
}
