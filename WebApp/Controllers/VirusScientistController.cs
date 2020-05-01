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
    public class VirusScientistController : ControllerBase
    {
        private readonly VirusContext _context;

        public VirusScientistController(VirusContext context)
        {
            _context = context;
        }

        // GET: api/VirusScientist
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VirusScientist>>> GetVirusScientist()
        {
            return await _context.VirusScientist.ToListAsync();
        }

        // GET: api/VirusScientist/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VirusScientist>> GetVirusScientist(int id)
        {
            var virusScientist = await _context.VirusScientist.FindAsync(id);

            if (virusScientist == null)
            {
                return NotFound();
            }

            return virusScientist;
        }

        // PUT: api/VirusScientist/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVirusScientist(int id, VirusScientist virusScientist)
        {
            if (id != virusScientist.Id)
            {
                return BadRequest();
            }

            _context.Entry(virusScientist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VirusScientistExists(id))
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

        // POST: api/VirusScientist
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<VirusScientist>> PostVirusScientist(VirusScientist virusScientist)
        {
            _context.VirusScientist.Add(virusScientist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVirusScientist", new { id = virusScientist.Id }, virusScientist);
        }

        // DELETE: api/VirusScientist/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<VirusScientist>> DeleteVirusScientist(int id)
        {
            var virusScientist = await _context.VirusScientist.FindAsync(id);
            if (virusScientist == null)
            {
                return NotFound();
            }

            _context.VirusScientist.Remove(virusScientist);
            await _context.SaveChangesAsync();

            return virusScientist;
        }

        private bool VirusScientistExists(int id)
        {
            return _context.VirusScientist.Any(e => e.Id == id);
        }
    }
}
