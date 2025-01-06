using Feedback.Application.Contracts.DTOs.Feedback.Application.DTOs;

namespace Feedback.Application.Contracts.Interfaces;

public interface ITeamService
{
    Task<IEnumerable<TeamDto>> GetAllTeamsAsync();
    Task<TeamDto> GetTeamByIdAsync(int id);
    Task<TeamDto> CreateTeamAsync(TeamDto teamDto);
    Task<TeamDto> UpdateTeamAsync(TeamDto teamDto);
    Task<bool> DeleteTeamAsync(int id);
}