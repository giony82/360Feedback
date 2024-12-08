using Feedback.Application.Contracts.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Feedback.Application.Contracts.Interfaces
{
    public interface ISubscriptionPlanService
    {
        Task<IEnumerable<SubscriptionPlanDto>> GetAllSubscriptionPlansAsync();
        /*Task<SubscriptionPlanDto> GetSubscriptionPlanByIdAsync(int id);
        Task<SubscriptionPlanDto> CreateSubscriptionPlanAsync(SubscriptionPlanDto subscriptionPlanDto);
        Task<SubscriptionPlanDto> UpdateSubscriptionPlanAsync(SubscriptionPlanDto subscriptionPlanDto);
        Task DeleteSubscriptionPlanAsync(int id);*/
    }
}