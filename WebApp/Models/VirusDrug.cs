using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class VirusDrug
    {
        public int Id { get; set; }
        public int VirusId { get; set; }
        public int DrugId { get; set; }
        public virtual Virus Virus { get; set; }
        public virtual Drug Drug { get; set; }
    }
}
