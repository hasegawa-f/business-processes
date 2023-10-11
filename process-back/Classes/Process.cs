namespace process_back.Classes

{
    public class Process
    {
        public int ID { get; set; }
        public string Name { get; set; }

        public string Area { get; set; }

        public string? Description { get; set; }

        public Subprocess[]? Subprocesses { get; set; }
    }
}
