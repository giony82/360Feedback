using Feedback.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Feedback.Infrastructure;

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
        modelBuilder.Entity<User>()
            .HasMany(u => u.Teams)
            .WithMany(t => t.Users)
            .UsingEntity(j => j.ToTable("TeamUser"));
    }
}