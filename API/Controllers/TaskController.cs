using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class TaskController : BaseApiController
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IProjectRepository _projectRepository;
        public TaskController(ITaskRepository taskRepository, IProjectRepository projectRepository,
             IUserRepository userRepository,
             IMapper mapper, DataContext context)
        {
            _userRepository = userRepository;
            _context = context;
            _mapper = mapper;
            _taskRepository = taskRepository;
            _projectRepository = projectRepository;
        }



        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
        {
            var tasks = await _taskRepository.GetTasksAsync();
            return Ok(tasks);
        }


        [HttpGet("{username}")]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetTasksForDevelopers(string username)
        { 




            var projects = await _taskRepository.GetTasksForDeveloperAsync(username);

            return Ok(projects);         
        }

        [HttpGet("all-tasks/{username}/{id}")]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetTasksForManagerAndAdmin(string username, int id) 
        {
            var projects = await _taskRepository.GetTasksForManagerAndAdminAsync(username, id);

            return Ok(projects);             
        }

        [HttpGet("specific-tasks/{username}/{id}")]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetTasksForSpecificProject(string username, int id)  
        {

            var projects = await _taskRepository.GetTasksForSpecificProject(username, id);

            return Ok(projects);             
        }


        [HttpPost("{username}/{id}")]
        public async Task<ActionResult<TaskDto>> CreateTask(TaskDto taskDto, string username, int id)
        {
            var result = await _taskRepository.CreateTask(taskDto, username);
            return Ok(result);


        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTask(TaskUpdateDto taskUpdateDto, int id, [FromQuery] string username)
        {
            System.Console.WriteLine("usao sam ovde " + id);

            var user = await _userRepository.GetUserByUsernameAsync(username);

            var task = await _taskRepository.GetAppTaskByIdAsync(id);

            _mapper.Map(taskUpdateDto, task);
            task.User = user;
            _taskRepository.Update(task);
            if (await _userRepository.SaveAllAsync()) return NoContent();   //saveallasync returns a bool true if there are > 0 written in the database
            return BadRequest("Failed to update user");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            var task = await _taskRepository.GetTaskByIdAsync(id);

            _mapper.Map<AppUser>(task.User);
            _mapper.Map<AppProject>(task.Project);
            var taskToDelete = _mapper.Map<AppTask>(task);
            System.Console.WriteLine("User column id is: " + taskToDelete.User.UserName);

            System.Console.WriteLine("Task da se obrise je : " + taskToDelete.Id);

            _taskRepository.DeleteTask(taskToDelete);

            return Ok("Project deleted");

        }

    }




}