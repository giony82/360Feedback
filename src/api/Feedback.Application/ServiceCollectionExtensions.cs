using Feedback.Application.Contracts.Interfaces;
using Feedback.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Feedback.Application
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthorizationService, AuthorizationService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICompanyService, CompanyService>();

            return services;
        }
    }
}