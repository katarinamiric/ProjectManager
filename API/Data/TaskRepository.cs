using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TaskRepository : ITaskRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IProjectRepository _projectRepository;
        public TaskRepository(DataContext context, IMapper mapper, IUserRepository userRepository, IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _context = context;
        }

        public async void DeleteTask(AppTask task)
        {
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }

        public async Task<TaskDto> GetTaskByIdAsync(int id)
        {
            return await _context.Tasks
                .Where(x => x.Id == id)
                .ProjectTo<TaskDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<AppTask> GetAppTaskByIdAsync(int id)
        {
            return await _context.Tasks
            .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<TaskDto>> GetTasksAsync()
        {
            return await _context.Tasks
                .ProjectTo<TaskDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<TaskDto>> GetTasksForDeveloperAsync(string username)
        {
            return await _context.Tasks
            .Where(t => (t.User.UserName == username))
            .ProjectTo<TaskDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }
        public async Task<IEnumerable<TaskDto>> GetTasksForManagerAndAdminAsync(string username, int projectId)
        {
            return await _context.Tasks
            .Where(t => (t.Project.Id == projectId))
            .ProjectTo<TaskDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }
        public async Task<IEnumerable<TaskDto>> GetTasksForSpecificProject(string username, int projectId)
        {
            return await _context.Tasks
            .Where(t => (t.Project.Id == projectId) && t.User.UserName == username)
            .ProjectTo<TaskDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public void Update(AppTask task)
        {
            _context.Entry(task).State = EntityState.Modified;  //flagged
        }

        public async Task<TaskDto> CreateTask(TaskDto taskDto, string username)
        {
            var user = await _userRepository.GetMemberAsync(username);
            var project = await _projectRepository.GetProjectByIdAsync(taskDto.Project.Id);

            taskDto.User = user;
            taskDto.Project = project;

            _mapper.Map<AppUser>(taskDto.User);     
            _mapper.Map<AppProject>(taskDto.Project);

            var task = _mapper.Map<AppTask>(taskDto);


            _context.Tasks.Add(task);

            _context.Entry(task.User).State = EntityState.Detached;
            _context.Entry(task.Project).State = EntityState.Detached;
            _context.Entry(task.Project.User).State = EntityState.Detached;

            var result = await _context.SaveChangesAsync();

            return new TaskDto
            {
                Id = task.Id,
                Status = task.Status,
                Progress = task.Progress,
                Deadline = task.Deadline,
                Description = task.Description

            };
        }
    }
}