using Feedback.Application.DTOs;
using Feedback.Application.Interfaces;
using GraphQL;
using GraphQL.Resolvers;
using GraphQL.Types;

public class UserQuery : ObjectGraphType
{
    public UserQuery(IUserService userRepository)
    {
        AddField(new FieldType
        {
            Name = "users",
            Type = typeof(ListGraphType<UserType>),
            Resolver = new FuncFieldResolver<IEnumerable<UserDto>>(context => userRepository.GetAllUsers().Result)
        });

        AddField(new FieldType
        {
            Name = "user",
            Type = typeof(UserType),
            Arguments = new QueryArguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" }),
            Resolver = new FuncFieldResolver<UserDto>(context => userRepository.GetUserById(context.GetArgument<int>("id")).Result)
        });
    }
}