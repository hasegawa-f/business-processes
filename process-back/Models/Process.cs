using System.ComponentModel.DataAnnotations.Schema;

namespace process_back.Models
{
    [Table("process")]
    public class Process
    {
        [Column("process_id")]
        public int Id { get; set; }
        [Column("process_name")]
        public string Name { get; set; }
        [Column("department_id")]
        public int DepartmentId { get; set; }
        [Column("process_description")]
        public string Description { get; set; }
        [Column("parent_process_id")]
        public int? ParentProcessId { get; set; }
    }
}
