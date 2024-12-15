using Feedback.Core.Entities;
using Feedback.Core.Interfaces;
using Feedback.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Feedback.Infrastructure.Repositories;

public class SubscriptionPlanRepository(AppDbContext context) : ISubscriptionPlanRepository
{
    public async Task<IList<SubscriptionPlan>> GetAllAsync()
    {
        return await context.SubscriptionPlans.ToListAsync();
    }
}