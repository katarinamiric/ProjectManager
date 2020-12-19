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
        public ProjectRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<ProjectDto> GetProjectAsync(string name)
        {
            return await _context.Projects
                .Where(x => x.Name == name)
                .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        // public Task<AppUser> GetProjectByNameAsync(string username)
        // {
        //     throw new System.NotImplementedException();
        // }

        public async Task<IEnumerable<ProjectDto>> GetProjectsAsync()
        {
            return await _context.Projects
            .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        //     public Task<AppUser> GetUserByIdAsync(int id)
        //     {
        //         throw new System.NotImplementedException();
        //     }

        //     public async Task<bool> SaveAllAsync()
        //     {
        //         return await _context.SaveChangesAsync() > 0;
        //     }

        //     public void Update(AppProject user)
        //     {
        //         throw new System.NotImplementedException();
        //     }
        // }
    }
}