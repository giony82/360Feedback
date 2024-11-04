
using Feedback.Application.Contracts.Interfaces;
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

        return services;
    }
}