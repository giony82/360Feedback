using Feedback.Core.Entities;

namespace Feedback.Core.Interfaces;

public interface ITeamRepository
{
    Task<IEnumerable<Team>> GetAllTeamsAsync();
    Task<Team> GetTeamByIdAsync(int id);
    Task<Team> CreateTeamAsync(Team team);
    Task<Team> UpdateTeamAsync(Team team);
    Task<bool> DeleteTeamAsync(int id);
}