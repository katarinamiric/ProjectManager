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
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IMapper _mapper;

        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;

        }

        // [Authorize(Roles = "Admin")]
        [HttpGet]
        // [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()  //we could've used List<>
        {
            var users = await _userRepository.GetMembersAsync();
            return Ok(users);               //Ok takes an ActionResultObjectValue
        }

        //api/users/3
        // [Authorize]
        // [Authorize(Roles = "Member")]
        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)  //we could've used List<>
        {
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;    //gives us users username from the token that the api uses to authenticate this user!!!!
            var user = await _userRepository.GetUserByUsernameAsync(username);

            //user.City = memberUpdateDto.city; we would have to do this manually or just use the line below
            _mapper.Map(memberUpdateDto, user);
            _userRepository.Update(user);
            if (await _userRepository.SaveAllAsync()) return NoContent();   //saveallasync returns a bool true if there are > 0 written in the database
            return BadRequest("Failed to update user");
        }
    }
}