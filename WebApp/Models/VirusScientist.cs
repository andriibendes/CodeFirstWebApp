using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class VirusScientist
    {
        public int Id { get; set; }
        public int VirusId { get; set; }
        public int ScientistId { get; set; }
        public int Year { get; set; }

        public virtual Virus Virus { get; set; }
        public virtual Scientist Scientist { get; set; }
    }
}
