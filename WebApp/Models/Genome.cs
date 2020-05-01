using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Genome
    {
        public Genome()
        {
            Viruses = new List<Virus>();
        }

        public int Id { get; set; }

        public string Name { get; set; }
        public string Strand { get; set; }
        public string Sense { get; set; }
        public virtual ICollection<Virus> Viruses { get; set; }

    }
}
