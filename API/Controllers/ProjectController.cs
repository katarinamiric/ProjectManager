using System.Collections.Generic;
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
    // [Authorize]
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
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects()  //we could've used List<>
        {
            var projects = await _projectRepository.GetProjectsAsync();
            return Ok(projects);               //Ok takes an ActionResultObjectValue
        }



        [HttpPost("{username}")]
        public async Task<ActionResult<ProjectDto>> CreateProject(ProjectDto projectDto, string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);

            // var userMapped = _mapper.Map<AppUser>(user);
            projectDto.User = user;
            var project = _mapper.Map<AppProject>(projectDto);

            _context.Projects.Add(project);

            var result = await _context.SaveChangesAsync();

            return new ProjectDto
            {
                Name = project.Name
            };


        }
    }
}