using System.ComponentModel.DataAnnotations.Schema;
using API.DTOs;

namespace API.Entities
{
    [Table("Projects")]
    public class AppProject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public AppUser User { get; set; }
    }
}