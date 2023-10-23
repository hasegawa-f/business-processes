using Microsoft.EntityFrameworkCore;
using process_back.Interfaces;
using process_back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace process_back.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly AppDbContext _context;

        public DepartmentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Department>> GetAllDepartmentsAsync()
        {
            return await _context.Department.ToListAsync();
        }

        public async Task<Department> GetDepartmentByIdAsync(int id)
        {
            return await _context.Department.FindAsync(id);
        }

        public async Task UpdateDepartmentAsync(int id, Department department)
        {
            if (id != department.Id)
            {
                throw new InvalidOperationException("Invalid ID");
            }

            _context.Entry(department).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
                {
                    throw new InvalidOperationException("Department not found");
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<Department> CreateDepartmentAsync(Department department)
        {
            _context.Department.Add(department);
            await _context.SaveChangesAsync();
            return department;
        }

        public async Task DeleteDepartmentAsync(int id)
        {
            var department = await _context.Department.FindAsync(id);
            if (department == null)
            {
                throw new InvalidOperationException("Department not found");
            }

            _context.Department.Remove(department);
            await _context.SaveChangesAsync();
        }

        private bool DepartmentExists(int id)
        {
            return _context.Department.Any(e => e.Id == id);
        }
    }
}