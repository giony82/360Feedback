using AutoMapper;
using Feedback.Application.Contracts.DTOs.Feedback.Application.DTOs;
using Feedback.Application.Contracts.Interfaces;
using Feedback.Core.Entities;
using Feedback.Core.Interfaces;

namespace Feedback.Application.Services;

public class TeamService(ITeamRepository teamRepository, IMapper mapper) : ITeamService
{
    public async Task<IEnumerable<TeamDto>> GetAllTeamsAsync()
    {
        var teams = await teamRepository.GetAllTeamsAsync();
        return mapper.Map<IEnumerable<TeamDto>>(teams);
    }

    public async Task<TeamDto> GetTeamByIdAsync(int id)
    {
        Team? team = await teamRepository.GetTeamByIdAsync(id);
        return mapper.Map<TeamDto>(team);
    }

    public async Task<TeamDto> CreateTeamAsync(TeamDto teamDto)
    {
        var team = mapper.Map<Team>(teamDto);
        Team? createdTeam = await teamRepository.CreateTeamAsync(team);
        return mapper.Map<TeamDto>(createdTeam);
    }

    public async Task<TeamDto> UpdateTeamAsync(TeamDto teamDto)
    {
        var team = mapper.Map<Team>(teamDto);
        Team? updatedTeam = await teamRepository.UpdateTeamAsync(team);
        return mapper.Map<TeamDto>(updatedTeam);
    }

    public async Task<bool> DeleteTeamAsync(int id)
    {
        return await teamRepository.DeleteTeamAsync(id);
    }
}