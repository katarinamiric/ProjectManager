using System;
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
    public class ProjectRepository : IProjectRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public ProjectRepository(DataContext context, IMapper mapper, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<ProjectDto> createProject(ProjectDto projectDto, string username)
        {
            var user = await _userRepository.GetMemberAsync(username);



            projectDto.User = user;
            _mapper.Map<AppUser>(projectDto.User);

            var project = _mapper.Map<AppProject>(projectDto);

            _context.Projects.Add(project);
            _context.Entry(project.User).State = EntityState.Detached;


            var result = await _context.SaveChangesAsync();

            return new ProjectDto
            {
                Name = project.Name,
                User = user
            };
        }

        public async void DeleteProject(AppProject project)
        {
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

        }

        public async Task<AppProject> GetAppProjectByIdAsync(int id)
        {
            return await _context.Projects.FindAsync(id);
        }

        public async Task<IEnumerable<TaskDto>> GetNumberOfOvderdueTasks(int id)
        {
            var tasks = await _context.Tasks

                .Where(t => (t.Project.Id == id))
                .ProjectTo<TaskDto>(_mapper.ConfigurationProvider)
                .Where(t => (DateTime.Today.Day -t.Deadline.Day) <= 2 && t.Progress < 100)
                .ToListAsync();

            return tasks;
        }

        public async Task<ProgressDto> GetNumberOfTasksPerStatus(int id)
        {
            var tasks = await _context.Tasks

                .Where(t => t.Project.Id == id)
                .Select(t => t.Status)
                .ToListAsync();

            var totalNoOfTasks = tasks.Count();
            var NoOfNew = 0;
            var NoOfInProgress = 0;
            var NoOfFinished = 0;

            foreach (var item in tasks)
            {
                if (item == "New") NoOfNew++;
                if (item == "In Progress") NoOfInProgress++;
                if (item == "Finished") NoOfFinished++;
            }
            return new ProgressDto
            {
                TotalNoOfTasks = totalNoOfTasks,
                NoOfNew = NoOfNew,
                NoOfInProgress = NoOfInProgress,
                NoOfFinished = NoOfFinished
            };
        }

        public async Task<ProgressDto> GetOverallProgress(int id)
        {
            var progress = await _context.Tasks

                .Where(t => t.Project.Id == id)
                .Select(t => t.Progress)
                .ToListAsync();

            var numberOfTasks = progress.Count();
            var final = 0;
            foreach (var item in progress)
            {
                final += item;
            }

            if (numberOfTasks == 0)
            {
                return new ProgressDto
                {
                    Progress = 0
                };
            }
            return new ProgressDto
            {
                Progress = final / numberOfTasks
            };


        }

        public async Task<ProjectDto> GetProjectAsync(string name)
        {
            return await _context.Projects
                .Where(x => x.Name == name)
                .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }
        public async Task<ProjectDto> GetProjectByIdAsync(int id)
        {
            return await _context.Projects
                .Where(x => x.Id == id)
                .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<ProjectDto>> GetProjectsAsync()
        {
            return await _context.Projects
            .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public async Task<IEnumerable<ProjectDto>> GetProjectsForManagersAsync(string username)
        {
            return await _context.Projects
            .Where(p => p.User.UserName == username)
            .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void UpdateProject(AppProject project)
        {
            _context.Entry(project).State = EntityState.Modified;  //flagged
        }

    }
}