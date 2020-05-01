using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebApp.Models
{
    public class VirusContext : DbContext
    {
        public virtual DbSet<VirusScientist> VirusScientist { get; set; }
        public virtual DbSet<VirusDrug> VirusDrug{ get; set; }
        public virtual DbSet<Virus> Virus { get; set; }
        public virtual DbSet<Organism> Organism { get; set; }
        public virtual DbSet<Drug> Drug { get; set; }
        public virtual DbSet<Genome> Genome { get; set; }
        public virtual DbSet<Scientist> Scientist { get; set; }
        public VirusContext(DbContextOptions<VirusContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

    }
}
