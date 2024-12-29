using Feedback.Application.Contracts.DTOs;
using Feedback.Core.Entities;

namespace Feedback.Application.Contracts.Interfaces;

public interface IProjectService
{
    Task<IEnumerable<ProjectDto>> GetAllProjects();
    Task<ProjectDto> CreateProject(ProjectDto project);
    /*Task<Project> GetProjectById(int id);
    Task<IEnumerable<Project>> GetProjectsByCompanyId(int companyId);
    
    Task<Project> UpdateProject(Project project);
    Task<bool> DeleteProject(int id);*/
}