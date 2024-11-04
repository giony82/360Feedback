using Feedback.Core.Entities;
using Feedback.Infrastructure.Data.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Feedback.Infrastructure.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users
    {
        get; set;
    }
    public DbSet<Team> Teams
    {
        get; set;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new FeedbackConfiguration());
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new TeamConfiguration());
    }
}