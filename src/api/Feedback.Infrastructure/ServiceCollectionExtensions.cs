
using Feedback.Application.Contracts.Interfaces;
using Feedback.Core.Interfaces;
using Feedback.Infrastructure.Repositories;
using Feedback.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Feedback.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddScoped<ILinkedInAuthService, LinkedInAuthService>();
        services.AddScoped<IWebUser, WebUser>();
        services.AddHttpClient<ILinkedInAuthService, LinkedInAuthService>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ICompanyRepository, CompanyRepository>();
        services.AddScoped<ISubscriptionPlanRepository, SubscriptionPlanRepository>();
        services.AddScoped<IProjectRepository, ProjectRepository>();

        return services;
    }
}