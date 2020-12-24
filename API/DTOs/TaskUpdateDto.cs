using System;

namespace API.DTOs
{
    public class TaskUpdateDto
    {
        public string Status { get; set; }
        public int Progress { get; set; }
        public DateTime Deadline { get; set; }
        public string Description { get; set; }
        public MemberDto User { get; set; }
    }
}