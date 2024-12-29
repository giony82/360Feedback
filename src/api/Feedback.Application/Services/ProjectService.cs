using AutoMapper;
using Feedback.Application.Contracts.DTOs;
using Feedback.Application.Contracts.Interfaces;
using Feedback.Core.Entities;
using Feedback.Core.Interfaces;

namespace Feedback.Application.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IMapper _mapper;

        public ProjectService(IProjectRepository projectRepository, IMapper mapper)
        {
            _mapper = mapper;
            _projectRepository = projectRepository;
        }

        public async Task<IEnumerable<ProjectDto>> GetAllProjects()
        {
            var projects = await _projectRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ProjectDto>>(projects);
        }

        public async Task<ProjectDto> CreateProject(ProjectDto dto)
        {
            var project = _mapper.Map<Project>(dto);
            var addedItem= await _projectRepository.AddAsync(project);
            return _mapper.Map<ProjectDto>(addedItem);
        }

        /*public async Task<Project> GetProjectById(int id)
        {
            return await _projectRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Project>> GetProjectsByCompanyId(int companyId)
        {
            return await _projectRepository.GetByCompanyIdAsync(companyId);
        }

        

        public async Task<Project> UpdateProject(Project project)
        {
            return await _projectRepository.UpdateAsync(project);
        }

        public async Task<bool> DeleteProject(int id)
        {
            return await _projectRepository.DeleteAsync(id);
        }*/
    }
}