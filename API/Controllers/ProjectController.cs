using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProjectController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IProjectRepository _projectRepository;

        private readonly IUserRepository _userRepository;
        public ProjectController(IUserRepository userRepository, IProjectRepository projectRepository, IMapper mapper, DataContext context)
        {
            _userRepository = userRepository;
            _context = context;
            _mapper = mapper;
            _projectRepository = projectRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects() 
        {
            var projects = await _projectRepository.GetProjectsAsync();
            return Ok(projects);               //Ok takes an ActionResultObjectValue
        }
        [HttpGet("get-project/{id}")]
        public async Task<ActionResult<ProjectDto>> GetProjects(int id)  
        {
            var project = await _projectRepository.GetProjectByIdAsync(id);
            return Ok(project);               
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjectsForManagers(string username)
        {
            var projects = await _projectRepository.GetProjectsForManagersAsync(username);

            return Ok(projects);               
        }

        [HttpGet("overall-progress/{id}")]
        public async Task<ActionResult<int>> GetOverallProgress(int id) 
        {
            var projects = await _projectRepository.GetOverallProgress(id);
            var final = projects.Progress;

            return Ok(final);         
        }

        [HttpGet("per-status/{id}")]
        public async Task<ActionResult<ProgressDto>> GetNumberOfTasksPerStatus(int id) 
        {
            var projects = await _projectRepository.GetNumberOfTasksPerStatus(id);



            return Ok(projects);              
        }

        [HttpGet("overdue-tasks/{id}")]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetNumberOfOvderdueTasks(int id)  
        {
            var projects = await _projectRepository.GetNumberOfOvderdueTasks(id);



            return Ok(projects);          
        }



        [HttpPost("{username}")]  
        public async Task<ActionResult<ProjectDto>> CreateProject(ProjectDto projectDto, string username)
        {
            var project = await _projectRepository.createProject(projectDto, username);
            return Ok(project);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTask(ProjectUpdateDto projectDto, int id)
        {
            var project = await _projectRepository.GetAppProjectByIdAsync(id);
            _mapper.Map(projectDto, project);
            _projectRepository.UpdateProject(project);

            if (await _projectRepository.SaveAllAsync()) return NoContent();   //saveallasync returns a bool true if there are > 0 written in the database
            return BadRequest("Failed to update user");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(int id)
        {
            var project = await _projectRepository.GetProjectByIdAsync(id);
            var projectToDelete = _mapper.Map<AppProject>(project);
            _projectRepository.DeleteProject(projectToDelete);


            return Ok("Project deleted");

        }

    }
}