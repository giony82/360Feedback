using Feedback.Core.Entities;
using Feedback.Core.Interfaces;
using Feedback.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Feedback.Infrastructure.Repositories;

public class TeamRepository(AppDbContext context) : ITeamRepository
{
    public async Task<IEnumerable<Team>> GetAllTeamsAsync()
    {
        return await context.Teams.Include(t => t.Users).Include(x => x.Project).ToListAsync();
    }

    public async Task<Team?> GetTeamByIdAsync(int id)
    {
        return await context.Teams.Include(t => t.Users).FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<Team> CreateTeamAsync(Team team)
    {
        context.Teams.Add(team);
        await context.SaveChangesAsync();
        return team;
    }

    public async Task<Team> UpdateTeamAsync(Team team)
    {
        context.Entry(team).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return team;
    }

    public async Task<bool> DeleteTeamAsync(int id)
    {
        Team? team = await context.Teams.FindAsync(id);
        if (team == null)
            return false;

        context.Teams.Remove(team);
        await context.SaveChangesAsync();
        return true;
    }
}