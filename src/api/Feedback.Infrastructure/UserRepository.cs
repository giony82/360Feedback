using Microsoft.EntityFrameworkCore;

namespace Feedback.Infrastructure;

public class UserRepository(AppDbContext context) : IUserRepository
{
    public async Task<User> GetOrCreateUserAsync(string email, string name, string picture)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            user = new User { Email = email, Name = name, Picture = picture };
            context.Users.Add(user);
            await context.SaveChangesAsync();
        }
        return user;
    }
}