
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using process_back.Interfaces;
using process_back.Models;
using Dapper;

namespace process_back.Repositories
{
    public class ProcessRepository : IProcessRepository
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public ProcessRepository(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        private string? GetConnectionString()
        {
            return _configuration.GetConnectionString("DefaultConnection");
        }

        //GET All processes
        public async Task<List<ProcessReadOnly>> GetAllProcessesAsync()
        {
            string sqlScript = @"WITH RECURSIVE RecursiveCTE AS (
                                SELECT
                                    p.process_id,
                                    p.process_name,
                                    d.department_name,
                                    p.process_description,
                                    p.parent_process_id
                                FROM
                                    process p
                                INNER JOIN
                                    department d ON p.department_id = d.department_id
                                WHERE
                                    p.parent_process_id IS NULL
                                UNION ALL
                                SELECT
                                    p.process_id,
                                    p.process_name,
                                    d.department_name,
                                    p.process_description,
                                    p.parent_process_id
                                FROM
                                    process p
                                INNER JOIN
                                    department d ON p.department_id = d.department_id
                                INNER JOIN
                                    RecursiveCTE r ON r.process_id = p.parent_process_id
                            )
                            SELECT
                                process_id AS Id,
                                process_name AS Name,
                                department_name AS DepartmentName,
                                process_description AS Description,
                                parent_process_id AS ParentProcessId
                            FROM
                                RecursiveCTE
                            ORDER BY
                                 process_id;";

            var connectionString = GetConnectionString();

            using (var connection = new NpgsqlConnection(connectionString))
            {
                await connection.OpenAsync();
                var queryResult = await connection.QueryAsync<ProcessReadOnly>(sqlScript);

                // Perform the recursive mapping to build the hierarchy
                return BuildHierarchy(queryResult, null);
            }
        }

        //GET Process by Id
        public async Task<ProcessReadOnly> GetProcessByIdAsync(int parentrocessId)
        {
            string sqlScript = @"WITH RECURSIVE RecursiveCTE AS (
                                SELECT
                                    p.process_id,
                                    p.process_name,
                                    d.department_name,
                                    p.process_description,
                                    p.parent_process_id
                                FROM
                                    process p
                                INNER JOIN
                                    department d ON p.department_id = d.department_id
                                WHERE
                                    p.process_id = " + parentrocessId +
                                @"
                                UNION ALL
                                SELECT
                                    p.process_id,
                                    p.process_name,
                                    d.department_name,
                                    p.process_description,
                                    p.parent_process_id
                                FROM
                                    process p
                                INNER JOIN
                                    department d ON p.department_id = d.department_id
                                INNER JOIN
                                    RecursiveCTE r ON r.process_id = p.parent_process_id
                            )
                            SELECT
                                process_id AS Id,
                                process_name AS Name,
                                department_name AS DepartmentName,
                                process_description AS Description,
                                parent_process_id AS ParentProcessId
                            FROM
                                RecursiveCTE;";


            var connectionString = GetConnectionString();
            using (var connection = new NpgsqlConnection(connectionString))
            {
                await connection.OpenAsync();
                var result = await connection.QueryAsync<ProcessReadOnly>(sqlScript);

                return IndividualBuildHierarchy(result, parentrocessId);
            }
        }

        // PUT Process
        public async Task UpdateProcessAsync(int id, Process process)
        {
            if (id != process.Id)
            {
                throw new InvalidOperationException("Invalid ID");
            }


            _context.Entry(process).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProcessExists(id))
                {
                    throw new InvalidOperationException("Process not found");
                }
                else
                {
                    throw;
                }
            }
        }

        // POST Process
        public async Task<Process> CreateProcessAsync(Process process)
        {
            _context.Process.Add(process);
            await _context.SaveChangesAsync();
            return process;
        }

        // DELETE Process
        public async Task DeleteProcessAsync(int id)
        {
            var process = await _context.Process.FindAsync(id);
            if (process == null)
            {
                throw new InvalidOperationException("Process not found");
            }

            _context.Process.Remove(process);
            await _context.SaveChangesAsync();
        }

        private List<ProcessReadOnly> BuildHierarchy(IEnumerable<ProcessReadOnly> flatData, int? parentId)
        {
            var hierarchy = new List<ProcessReadOnly>();

            foreach (var item in flatData)
            {
                if (item.ParentProcessId == parentId)
                {
                    item.Subprocesses = BuildHierarchy(flatData, item.Id);
                    hierarchy.Add(item);
                }
            }

            return hierarchy;
        }


        private ProcessReadOnly IndividualBuildHierarchy(IEnumerable<ProcessReadOnly> flatData, int? parentId)
        {
            var result = new ProcessReadOnly();

            foreach (var item in flatData)
            {
                if (item.Id == parentId)
                {
                    item.Subprocesses = BuildHierarchy(flatData, item.Id);
                    result = item;
                }
            }

            return result;
        }

        private bool ProcessExists(int id)
        {
            return _context.Process.Any(e => e.Id == id);
        }
    }
}