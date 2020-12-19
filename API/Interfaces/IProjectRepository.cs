using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IProjectRepository
    {
        // void Update(AppProject user);
        // Task<bool> SaveAllAsync();
        // Task<IEnumerable<AppProject>> GetProjectsAsync();
        // Task<AppUser> GetUserByIdAsync(int id);
        // Task<AppUser> GetProjectByNameAsync(string name);
        Task<IEnumerable<ProjectDto>> GetProjectsAsync();
        Task<ProjectDto> GetProjectAsync(string username);
    }
}