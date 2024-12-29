using Feedback.Application.Contracts.DTOs;
using Feedback.Application.Contracts.Interfaces;
using Feedback.GraphQL.Types;
using GraphQL;
using GraphQL.Resolvers;
using GraphQL.Types;

namespace Feedback.GraphQL.Mutations;

public class ProjectMutations : ObjectGraphType
{
    public ProjectMutations(IProjectService projectService)
    {
        AddField(new FieldType
        {
            Name = "addProject",
            Type = typeof(ProjectType),
            Arguments = new QueryArguments(new QueryArgument<NonNullGraphType<ProjectInputType>> { Name = "project" }),
            Resolver = new FuncFieldResolver<ProjectDto>(async context =>
            {
                var dto = context.GetArgument<ProjectDto>("project");
                return await projectService.CreateProject(dto);
            })
        });
    }
}