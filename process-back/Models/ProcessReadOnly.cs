using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace process_back.Models
{
    public class ProcessReadOnly
    {
        [Key] public int Id { get; set; }
        public string Name { get; set; }
        public string DepartmentName { get; set; }
        public string Description { get; set; }
        public int? ParentProcessId { get; set; }
        public List<ProcessReadOnly> Subprocesses { get; set; } = new List<ProcessReadOnly>();
    }
}
