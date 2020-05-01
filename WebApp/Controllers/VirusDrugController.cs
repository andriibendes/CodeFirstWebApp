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
    public class VirusDrugController : ControllerBase
    {
        private readonly VirusContext _context;

        public VirusDrugController(VirusContext context)
        {
            _context = context;
        }

        // GET: api/VirusDrugs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VirusDrug>>> GetVirussDrug()
        {
            return await _context.VirusDrug.ToListAsync();
        }

        // GET: api/VirusDrugs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VirusDrug>> GetVirusDrug(int id)
        {
            var virusDrug = await _context.VirusDrug.FindAsync(id);

            if (virusDrug == null)
            {
                return NotFound();
            }

            return virusDrug;
        }

        // PUT: api/VirusDrugs/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVirusDrug(int id, VirusDrug virusDrug)
        {
            if (id != virusDrug.Id)
            {
                return BadRequest();
            }

            _context.Entry(virusDrug).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VirusDrugExists(id))
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

        // POST: api/VirusDrugs
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<VirusDrug>> PostVirusDrug(VirusDrug virusDrug)
        {
            _context.VirusDrug.Add(virusDrug);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVirusDrug", new { id = virusDrug.Id }, virusDrug);
        }

        // DELETE: api/VirusDrugs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<VirusDrug>> DeleteVirusDrug(int id)
        {
            var virusDrug = await _context.VirusDrug.FindAsync(id);
            if (virusDrug == null)
            {
                return NotFound();
            }

            _context.VirusDrug.Remove(virusDrug);
            await _context.SaveChangesAsync();

            return virusDrug;
        }

        private bool VirusDrugExists(int id)
        {
            return _context.VirusDrug.Any(e => e.Id == id);
        }
    }
}
