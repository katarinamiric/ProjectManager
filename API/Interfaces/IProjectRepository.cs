using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IProjectRepository
    {


        Task<IEnumerable<ProjectDto>> GetProjectsAsync();
        Task<AppProject> GetAppProjectByIdAsync(int id);
        Task<IEnumerable<ProjectDto>> GetProjectsForManagersAsync(string username);
        Task<ProjectDto> GetProjectAsync(string username);
        Task<ProgressDto> GetOverallProgress(int id);
        Task<ProgressDto> GetNumberOfTasksPerStatus(int id);
        Task<IEnumerable<TaskDto>> GetNumberOfOvderdueTasks(int id);
        Task<ProjectDto> GetProjectByIdAsync(int id);

        Task<ProjectDto> createProject(ProjectDto projectDto, string username);
        void DeleteProject(AppProject project);
        void UpdateProject(AppProject project);
        Task<bool> SaveAllAsync();

        

    }
}