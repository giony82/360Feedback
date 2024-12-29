using Feedback.Application.Contracts.DTOs;
using Feedback.Application.Contracts.Interfaces;
using Feedback.GraphQL.Types;
using GraphQL;
using GraphQL.Resolvers;
using GraphQL.Types;

namespace Feedback.GraphQL.Queries
{
    public class ProjectQuery : ObjectGraphType
    {
        public ProjectQuery(IProjectService projectService)
        {
            AddField(new FieldType
            {
                Name = "projects",
                Type = typeof(ListGraphType<ProjectType>),
                Resolver = new FuncFieldResolver<IEnumerable<ProjectDto>>(async context =>
                {
                    var users = await projectService.GetAllProjects();
                    return users;
                })
            });

            /*Field<ProjectType>("project")
                .Description("Get a project by id")
                .Argument<NonNullGraphType<IdGraphType>>("id", "The id of the project")
                .Resolve(context =>
                {
                    var id = context.GetArgument<int>("id");
                    return projectService.GetProjectById(id);
                });

            Field<ListGraphType<ProjectType>>("projectsByCompany")
                .Description("Get projects by company id")
                .Argument<NonNullGraphType<IdGraphType>>("companyId", "The id of the company")
                .Resolve(context =>
                {
                    var companyId = context.GetArgument<int>("companyId");
                    return projectService.GetProjectsByCompanyId(companyId);
                });*/
        }
    }
}