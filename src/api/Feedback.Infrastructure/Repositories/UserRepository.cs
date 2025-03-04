﻿using Feedback.Core.Interfaces;
using Feedback.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Feedback.Infrastructure.Repositories
{
    public class UserRepository(AppDbContext context) : IUserRepository
    {
        public async Task<User> GetOrCreateUserAsync(string email, string name, string picture)
        {
            var user = await context.Users.Include(u => u.Teams).FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                user = new User { Email = email, Name = name, Picture = picture };
                context.Users.Add(user);
                await context.SaveChangesAsync();
            }
            return user;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await context.Users.Include(u => u.Teams).ToListAsync();
        }

        public async Task<User?> GetUserById(int id)
        {
            return await context.Users.Include(u => u.Teams).FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}