using System.ComponentModel.DataAnnotations.Schema;

namespace process_back.Models
{
    [Table("department")]
    public class Department
    {
        [Column("department_id")]
        public int Id { get; set; }
        [Column("department_name")]
        public string Name { get; set; }
    }
}
