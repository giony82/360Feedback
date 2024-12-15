using Feedback.Core.Entities;

namespace Feedback.Core.Interfaces;

public interface ISubscriptionPlanRepository
{
    Task<IList<SubscriptionPlan>> GetAllAsync();
}