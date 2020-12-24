using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Tasks")]
    public class AppTask
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public int Progress { get; set; }
        public DateTime Deadline { get; set; }
        public string Description { get; set; }
        public AppUser User { get; set; }
        public AppProject Project { get; set; }
        
    }
}