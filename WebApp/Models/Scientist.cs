using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Scientist
    {
        public Scientist()
        {
            VirusScientist = new List<VirusScientist>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public virtual ICollection<VirusScientist> VirusScientist { get; set; }
    }
}
