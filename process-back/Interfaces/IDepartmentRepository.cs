using process_back.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace process_back.Interfaces
{
    public interface IDepartmentRepository
    {
        Task<IEnumerable<Department>> GetAllDepartmentsAsync();
        Task<Department> GetDepartmentByIdAsync(int id);
        Task UpdateDepartmentAsync(int id, Department department);
        Task<Department> CreateDepartmentAsync(Department department);
        Task DeleteDepartmentAsync(int id);
    }
}