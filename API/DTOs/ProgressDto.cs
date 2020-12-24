namespace API.DTOs
{
    public class ProgressDto
    {
        public int Progress { get; set; }
        public int TotalNoOfTasks { get; set; }
        public int NoOfNew { get; set; }
        public int NoOfInProgress { get; set; }
        public int NoOfFinished { get; set; }
    }
}