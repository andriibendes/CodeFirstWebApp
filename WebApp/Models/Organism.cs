using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Organism
    {
        public Organism()
        {
            Viruses = new List<Virus>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Virus> Viruses { get; set; }
    }
}
