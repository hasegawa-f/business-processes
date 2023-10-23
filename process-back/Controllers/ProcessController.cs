using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using process_back.Models;
using process_back.Interfaces;

[Route("/[controller]")]
[ApiController]
public class ProcessController : ControllerBase
{
    private readonly IProcessRepository _repository;

    public ProcessController(IProcessRepository repository)
    {
        _repository = repository;
    }

    // GET: /Process
    [HttpGet]
    public async Task<ActionResult<List<ProcessReadOnly>>> GetAllProcesses()
    {
        List<ProcessReadOnly> processes = await _repository.GetAllProcessesAsync();
        if (processes == null)
        {
            return NotFound();
        }
        return Ok(processes);
    }

    // GET: /Process/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProcessReadOnly>> GetProcess(int id)
    {
        var process = await _repository.GetProcessByIdAsync(id);
        if (process == null || process.Id == 0)
        {
            return NotFound();
        }
        return Ok(process);
    }

    // PUT: /Process/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProcess(int id, Process process)
    {
        try
        {
            await _repository.UpdateProcessAsync(id, process);
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // POST: /Process
    [HttpPost]
    public async Task<IActionResult> PostProcess(Process process)
    {
        try
        {
            var createdProcess = await _repository.CreateProcessAsync(process);
            return CreatedAtAction("GetProcess", new { id = createdProcess.Id }, createdProcess);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // DELETE: /Process/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProcess(int id)
    {
        try
        {
            await _repository.DeleteProcessAsync(id);
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
