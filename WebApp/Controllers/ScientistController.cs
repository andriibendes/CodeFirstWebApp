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
    public class ScientistController : Controller
    {
        private readonly VirusContext _context;
        public ScientistController(VirusContext context)
        {
            _context = context;
        }


        // GET: api/Scientists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Scientist>>> GetScientist()
        {
            return await _context.Scientist.ToListAsync();
        }

        // GET: api/Scientists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Scientist>> GetScientist(int id)
        {
            var scientist = await _context.Scientist.FindAsync(id);

            if (scientist == null)
            {
                return NotFound();
            }

            return scientist;
        }

        // PUT: api/Scientists/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScientist(int id, Scientist scientist)
        {
            if (id != scientist.Id)
            {
                return BadRequest();
            }

            _context.Entry(scientist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScientistExists(id))
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

        // POST: api/Scientists
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Scientist>> PostScientist(Scientist scientist)
        {
            _context.Scientist.Add(scientist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetScientist", new { id = scientist.Id }, scientist);
        }

        // DELETE: api/Scientists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Scientist>> DeleteScientist(int id)
        {
            var scientist = await _context.Scientist.FindAsync(id);
            if (scientist == null)
            {
                return NotFound();
            }

            _context.Scientist.Remove(scientist);
            await _context.SaveChangesAsync();

            return scientist;
        }

        private bool ScientistExists(int id)
        {
            return _context.Scientist.Any(e => e.Id == id);
        }
    }
}
