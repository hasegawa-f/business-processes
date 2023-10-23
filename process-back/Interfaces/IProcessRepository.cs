using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using process_back.Models;

namespace process_back.Interfaces
{
    public interface IProcessRepository
    {
        Task<List<ProcessReadOnly>> GetAllProcessesAsync();
        Task<ProcessReadOnly> GetProcessByIdAsync(int id);
        Task UpdateProcessAsync(int id, Process process);
        Task<Process> CreateProcessAsync(Process process);
        Task DeleteProcessAsync(int id);
    }
}
