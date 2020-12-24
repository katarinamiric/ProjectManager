using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository userRepository, UserManager<AppUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
            _userRepository = userRepository;

        }


        [HttpGet]

        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers() 
        {
            var users = await _userRepository.GetMembersAsync();
            return Ok(users);             
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)  
        {
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpGet("managers")]
        public async Task<ActionResult<MemberDto>> GetUsersWithRoleManager(string username) 
        {
            var users = await _userManager.Users
                 .Include(r => r.UserRoles)
                 .ThenInclude(r => r.Role)
                 .OrderBy(u => u.UserName)
                 .Select(u => new
                 {
                     u.Id,
                     Username = u.UserName,
                     Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                 })
                 .Where(r => r.Roles.Contains("Manager"))
                 .ToListAsync();

            return Ok(users);

        }
        [HttpGet("developers")]
        public async Task<ActionResult<MemberDto>> GetUsersWithRoleDeveloper(string username) 
        {

            var users = await _userManager.Users
                 .Include(r => r.UserRoles)
                 .ThenInclude(r => r.Role)
                 
                 .OrderBy(u => u.UserName)
                 .Select(u => new
                 {
                     u.Id,
                     Username = u.UserName,
                     Roles = u.UserRoles.Select(r => r.Role.Name).ToList(),
                     Tasks = u.Tasks.Select(t => t.Id)

                 })
                 .Where(r => r.Roles.Contains("Developer") && r.Tasks.Count() < 3)
                 .ToListAsync();


            return Ok(users);

        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto, [FromQuery] string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);
            _mapper.Map(memberUpdateDto, user);
            _userRepository.Update(user);
            if (await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to update user");
        }

        
    }
}