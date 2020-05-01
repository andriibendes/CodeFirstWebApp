using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Drug
    {
        public Drug()
        {
            VirusDrug = new List<VirusDrug>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Formula { get; set; }
        public double Cost { get; set; }
        public virtual ICollection<VirusDrug> VirusDrug { get; set; }
    }
}
