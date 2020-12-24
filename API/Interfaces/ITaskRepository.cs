using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskDto>> GetTasksAsync();
        public Task<AppTask> GetAppTaskByIdAsync(int id);
        Task<IEnumerable<TaskDto>> GetTasksForDeveloperAsync(string username);
        Task<IEnumerable<TaskDto>> GetTasksForManagerAndAdminAsync(string username, int projectId);
        Task<IEnumerable<TaskDto>> GetTasksForSpecificProject(string username, int projectId);
        Task<TaskDto> GetTaskByIdAsync(int id);
        Task<TaskDto> CreateTask(TaskDto taskDto, string username);
        void DeleteTask(AppTask task);
        void Update(AppTask task);

    }
}