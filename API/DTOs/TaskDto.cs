using System;
using API.Entities;

namespace API.DTOs
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public int Progress { get; set; }
        public DateTime Deadline { get; set; }
        public string Description { get; set; }
        public MemberDto User { get; set; }
        public ProjectDto Project { get; set; }
    }
}