using Feedback.Application.Contracts.DTOs;
using Feedback.Application.Contracts.Interfaces;
using Feedback.Core.Entities;
using Feedback.Core.Interfaces;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Feedback.Application.Services
{
    public class SubscriptionPlanService(ISubscriptionPlanRepository subscriptionPlanRepository, IMapper mapper)
        : ISubscriptionPlanService
    {
        public async Task<IEnumerable<SubscriptionPlanDto>> GetAllSubscriptionPlansAsync()
        {
            var subscriptionPlans = await subscriptionPlanRepository.GetAllAsync();
            return mapper.Map<IEnumerable<SubscriptionPlanDto>>(subscriptionPlans);
        }

        /*
        public async Task<SubscriptionPlanDto> GetSubscriptionPlanByIdAsync(int id)
        {
            var subscriptionPlan = await _subscriptionPlanRepository.GetByIdAsync(id);
            return _mapper.Map<SubscriptionPlanDto>(subscriptionPlan);
        }

        public async Task<SubscriptionPlanDto> CreateSubscriptionPlanAsync(SubscriptionPlanDto subscriptionPlanDto)
        {
            var subscriptionPlan = _mapper.Map<SubscriptionPlan>(subscriptionPlanDto);
            var createdSubscriptionPlan = await _subscriptionPlanRepository.AddAsync(subscriptionPlan);
            return _mapper.Map<SubscriptionPlanDto>(createdSubscriptionPlan);
        }

        public async Task<SubscriptionPlanDto> UpdateSubscriptionPlanAsync(SubscriptionPlanDto subscriptionPlanDto)
        {
            var existingSubscriptionPlan = await _subscriptionPlanRepository.GetByIdAsync(subscriptionPlanDto.Id);
            if (existingSubscriptionPlan == null)
            {
                throw new KeyNotFoundException($"SubscriptionPlan with id {subscriptionPlanDto.Id} not found.");
            }

            _mapper.Map(subscriptionPlanDto, existingSubscriptionPlan);
            var updatedSubscriptionPlan = await _subscriptionPlanRepository.UpdateAsync(existingSubscriptionPlan);
            return _mapper.Map<SubscriptionPlanDto>(updatedSubscriptionPlan);
        }
        
        public async Task DeleteSubscriptionPlanAsync(int id)
        {
            var subscriptionPlan = await _subscriptionPlanRepository.GetByIdAsync(id);
            if (subscriptionPlan == null)
            {
                throw new KeyNotFoundException($"SubscriptionPlan with id {id} not found.");
            }

            await _subscriptionPlanRepository.DeleteAsync(subscriptionPlan);
        }
        */
    }
}