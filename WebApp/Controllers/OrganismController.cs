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
    public class OrganismController : ControllerBase
    {
        private readonly VirusContext _context;

        public OrganismController(VirusContext context)
        {
            _context = context;
        }

        // GET: api/Organism
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Organism>>> GetOrganism()
        {
            return await _context.Organism.ToListAsync();
        }

        // GET: api/Organism/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Organism>> GetOrganism(int id)
        {
            var organism = await _context.Organism.FindAsync(id);

            if (organism == null)
            {
                return NotFound();
            }

            return organism;
        }

        // PUT: api/Organism/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrganism(int id, Organism organism)
        {
            if (id != organism.Id)
            {
                return BadRequest();
            }

            _context.Entry(organism).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganismExists(id))
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

        // POST: api/Organism
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Organism>> PostOrganism(Organism organism)
        {
            _context.Organism.Add(organism);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrganism", new { id = organism.Id }, organism);
        }

        // DELETE: api/Organism/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Organism>> DeleteOrganism(int id)
        {
            var organism = await _context.Organism.FindAsync(id);
            if (organism == null)
            {
                return NotFound();
            }

            _context.Organism.Remove(organism);
            await _context.SaveChangesAsync();

            return organism;
        }

        private bool OrganismExists(int id)
        {
            return _context.Organism.Any(e => e.Id == id);
        }
    }
}
