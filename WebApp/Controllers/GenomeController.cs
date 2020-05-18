using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenomeController : Controller
    {
        private readonly VirusContext _context;

        public GenomeController(VirusContext context)
        {
            _context = context;
        }

        // GET: api/Genomes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Genome>>> GetGenome()
        {
            return await _context.Genome.ToListAsync();
        }

        // GET: api/Genomes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Genome>> GetGenome(int id)
        {
            var genome = await _context.Genome.FindAsync(id);

            if (genome == null)
            {
                return NotFound();
            }

            return genome;
        }

        // PUT: api/Genomes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGenome(int id, Genome genome)
        {
            if (id != genome.Id)
            {
                return BadRequest();
            }

            _context.Entry(genome).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GenomeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Genomes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Genome>> PostGenome(Genome genome)
        {
            _context.Genome.Add(genome);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGenome", new { id = genome.Id }, genome);
        }

        // DELETE: api/Genomes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Genome>> DeleteGenome(int id)
        {
            var genome = await _context.Genome.FindAsync(id);
            if (genome == null)
            {
                return NotFound();
            }

            _context.Genome.Remove(genome);
            await _context.SaveChangesAsync();

            return genome;
        }

        private bool GenomeExists(int id)
        {
            return _context.Genome.Any(e => e.Id == id);
        }
    }
}
