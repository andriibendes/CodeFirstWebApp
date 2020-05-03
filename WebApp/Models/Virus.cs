using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Virus
    {
        public Virus()
        {
            VirusDrug = new List<VirusDrug>();
            VirusScientist = new List<VirusScientist>(); 
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int GenomeId { get; set; }
        public int OrganismId { get; set; }

        public virtual Genome Genome{ get; set; }
        public virtual Organism Organism { get; set; }
        public virtual ICollection<VirusDrug> VirusDrug { get; set; }
        public virtual ICollection<VirusScientist> VirusScientist { get; set; }

    }
}
