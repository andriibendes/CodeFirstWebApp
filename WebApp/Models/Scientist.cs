using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class CountryNameValidator : ValidationAttribute
    {
        public CountryNameValidator()
        {
        }
        public string GetErrorMessage() => $"Country name is not correct!";

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string n = value.ToString();
            CultureInfo[] cultures = CultureInfo.GetCultures(CultureTypes.SpecificCultures);
            List<string> countries = new List<string>();
            foreach (CultureInfo culture in cultures)
            {
                RegionInfo region = new RegionInfo(culture.Name);
                if (!(countries.Contains(region.EnglishName)))
                {
                    countries.Add(region.EnglishName);
                }
            }
            foreach (string name in countries)
            {
                if (n == name)
                {
                    return ValidationResult.Success;
                }
            }
            return new ValidationResult(GetErrorMessage());
        }
    }
    public class Scientist
    {
        public Scientist()
        {
            VirusScientist = new List<VirusScientist>();
        }

        public int Id { get; set; }
        [Required(ErrorMessage = "The field cannot be empty!"), RegularExpression("^([a-zA-Z]{2,}\\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)", ErrorMessage = "The name is not correct!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "The field cannot be empty!"), CountryNameValidator()]
        public string Country { get; set; }
        public virtual ICollection<VirusScientist> VirusScientist { get; set; }
    }
}
