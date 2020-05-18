using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        [Required(ErrorMessage = "The field cannot be empty!"), RegularExpression("[A-Z][a-z]+", ErrorMessage = "The name is not correct!")]
        public string Name { get; set; }
        public virtual ICollection<Virus> Viruses { get; set; }
    }
}
