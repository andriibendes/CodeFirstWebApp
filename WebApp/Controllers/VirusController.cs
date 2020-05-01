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
    public class VirusController : ControllerBase
    {
        private readonly VirusContext _context;

        public VirusController(VirusContext context)
        {
            _context = context;
        }

        // GET: api/Virus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Virus>>> GetVirus()
        {
            return await _context.Virus.ToListAsync();
        }

        // GET: api/Virus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Virus>> GetVirus(int id)
        {
            var virus = await _context.Virus.FindAsync(id);

            if (virus == null)
            {
                return NotFound();
            }

            return virus;
        }

        // PUT: api/Virus/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVirus(int id, Virus virus)
        {
            if (id != virus.Id)
            {
                return BadRequest();
            }

            _context.Entry(virus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VirusExists(id))
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

        // POST: api/Virus
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Virus>> PostVirus(Virus virus)
        {
            _context.Virus.Add(virus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVirus", new { id = virus.Id }, virus);
        }

        // DELETE: api/Virus/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Virus>> DeleteVirus(int id)
        {
            var virus = await _context.Virus.FindAsync(id);
            if (virus == null)
            {
                return NotFound();
            }

            _context.Virus.Remove(virus);
            await _context.SaveChangesAsync();

            return virus;
        }

        private bool VirusExists(int id)
        {
            return _context.Virus.Any(e => e.Id == id);
        }
    }
}
