using Microsoft.EntityFrameworkCore;

namespace Feedback.Infrastructure;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<User> Users
    {
        get; set;
    }
}