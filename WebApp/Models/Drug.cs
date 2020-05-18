using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        [Required(ErrorMessage = "The field cannot be empty!"), RegularExpression("[A-Z][a-z]+", ErrorMessage = "The name is not correct!")]
        public string Name { get; set; }
        [RegularExpression("[A-Z][a-z]?\\d*|(?<!\\([^)]*)\\(.*\\)\\d+(?![^(]*\\))", ErrorMessage = "The formula is not correct!")]
        public string Formula { get; set; }
        [Required(ErrorMessage = "The field cannot be empty!"), Range(0, 999999, ErrorMessage = "Cost is not correct!")]
        public double Cost { get; set; }
        public virtual ICollection<VirusDrug> VirusDrug { get; set; }
    }
}
