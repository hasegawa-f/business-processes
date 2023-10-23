using Microsoft.EntityFrameworkCore;
using process_back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace process_back
{
    public class AppDbContext : DbContext
    {
        public DbSet<Process> Process { get; set; }

        public DbSet<ProcessReadOnly> ProcessReadOnly { get; set; }

        public DbSet<Department> Department { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
    }
}