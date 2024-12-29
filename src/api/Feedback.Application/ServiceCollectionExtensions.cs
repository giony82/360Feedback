using Feedback.Application.Contracts.Interfaces;
using Feedback.Application.Services;
using Microsoft.Extensions.DependencyInjection;
using Scrutor;

namespace Feedback.Application
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthorizationService, AuthorizationService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICompanyService, CompanyService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<ISubscriptionPlanService, SubscriptionPlanService>();

            /*Does not work: services.Scan(selector => selector
                .FromCallingAssembly()
                .AddClasses()
                .UsingRegistrationStrategy(RegistrationStrategy.Skip)
                .AsMatchingInterface()
                .WithScopedLifetime());
                */

            return services;
        }
    }
}