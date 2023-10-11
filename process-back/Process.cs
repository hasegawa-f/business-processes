namespace ProcessApp
{
    public class Process
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Area { get; set; }

        public string? Description { get; set; }

        public List<Subprocess>? Subprocesses { get; set; }
    }
}