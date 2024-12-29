using Feedback.Core.Entities;

namespace Feedback.Core.Interfaces
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAllAsync();
        Task<Project> AddAsync(Project project);
        /*Task<Project> GetByIdAsync(int id);
        Task<IEnumerable<Project>> GetByCompanyIdAsync(int companyId);
        
        Task<Project> UpdateAsync(Project project);
        Task<bool> DeleteAsync(int id);*/
    }
}