using System.Reflection;
using System.Text;
using Feedback.Application;
using Feedback.Application.Contracts.Interfaces;
using Feedback.Core.Interfaces;
using Feedback.GraphQL;
using Feedback.Infrastructure;
using Feedback.Infrastructure.Data;
using Feedback.Infrastructure.Profiles;
using Feedback.Infrastructure.Repositories;
using Feedback.Infrastructure.Services;
using GraphQL;

using GraphQL.Types;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("https://localhost:3000")
            .AllowAnyMethod()
            .AllowCredentials()
            .AllowAnyHeader());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddAutoMapper(typeof(MappingProfile));

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        b => b.MigrationsAssembly("Feedback.Infrastructure")
    ));

builder.Services.AddScoped<IGoogleAuthService, GoogleAuthService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IJwtSettings, JwtSettings>();
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices();
builder.Services.AddGraphQlServices();

builder.Services.AddHttpContextAccessor();


// Add GraphQL Services
builder.Services.AddGraphQL(qlBuilder =>
{
    qlBuilder.AddGraphTypes(Assembly.GetExecutingAssembly());
    qlBuilder.AddSystemTextJson();
    qlBuilder.AddUnhandledExceptionHandler(context =>
    {
        context.ErrorMessage = "An unexpected error occurred:" + context.Exception;
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.UseGraphQL("/graphql", config =>
{
    // require that the user be authenticated
    config.AuthorizationRequired = true;

    // require that the user be a member of at least one role listed
    //config.AuthorizedRoles.Add("MyRole");
    //config.AuthorizedRoles.Add("MyAlternateRole");

    // require that the user pass a specific authorization policy
    // config.AuthorizedPolicy = "MyPolicy";
});


app.Run();

