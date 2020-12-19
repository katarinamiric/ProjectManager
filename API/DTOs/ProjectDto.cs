using API.Entities;

namespace API.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public AppUser User { get; set; }
    }
}