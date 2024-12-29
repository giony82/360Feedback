using Feedback.Core.Entities;
using Feedback.Core.Interfaces;
using Feedback.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Feedback.Infrastructure.Repositories;

public class ProjectRepository(AppDbContext context) : IProjectRepository
{
    public async Task<IEnumerable<Project>> GetAllAsync()
    {
        return await context.Projects.Include(x=>x.Company).ToListAsync();
    }

    public async Task<Project> GetByIdAsync(int id)
    {
        return await context.Projects.FindAsync(id);
    }

    public async Task<IEnumerable<Project>> GetByCompanyIdAsync(int companyId)
    {
        return await context.Projects
            .Where(p => p.CompanyId == companyId)
            .ToListAsync();
    }

    public async Task<Project> AddAsync(Project project)
    {
        context.Projects.Add(project);
        await context.SaveChangesAsync();
        return project;
    }

    public async Task<Project> UpdateAsync(Project project)
    {
        context.Entry(project).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return project;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        Project? project = await context.Projects.FindAsync(id);
        if (project == null)
            return false;

        context.Projects.Remove(project);
        await context.SaveChangesAsync();
        return true;
    }
}