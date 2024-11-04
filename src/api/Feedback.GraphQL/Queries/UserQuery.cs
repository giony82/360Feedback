using Feedback.Application.Contracts.DTOs;
using Feedback.Application.Contracts.Interfaces;
using GraphQL;
using GraphQL.Resolvers;
using GraphQL.Types;

public class UserQuery : ObjectGraphType
{
    public UserQuery(IUserService userService)
    {
        AddField(new FieldType
        {
            Name = "users",
            Type = typeof(ListGraphType<UserType>),
            Resolver = new FuncFieldResolver<IEnumerable<UserDto>>(async context =>
            {
                var users = await userService.GetAllUsersAsync();
                return users;
            })
        });

        AddField(new FieldType
        {
            Name = "user",
            Type = typeof(UserType),
            Arguments = new QueryArguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" }),
            Resolver = new FuncFieldResolver<UserDto>(async context =>
            {
                try
                {
                    var id = context.GetArgument<int>("id");
                    UserDto? user = await userService.GetUserByIdAsync(id);
                    if (user == null)
                    {
                        context.Errors.Add(new ExecutionError("User not found"));
                        return null;
                    }
                    return user;
                }
                catch (Exception ex)
                {
                    context.Errors.Add(new ExecutionError("An error occurred while fetching the user", ex));
                    return null;
                }
            })
        });

    }
}