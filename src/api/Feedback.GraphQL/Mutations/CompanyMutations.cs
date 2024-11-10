using Feedback.Application.Contracts.DTOs;
using Feedback.Application.Contracts.Interfaces;
using GraphQL;
using GraphQL.Resolvers;
using GraphQL.Types;

namespace Feedback.GraphQL.Mutations;

public class CompanyMutations : ObjectGraphType
{
    public CompanyMutations(ICompanyService companyService)
    {
        AddField(new FieldType
        {
            Name = "addCompany",
            Type = typeof(CompanyType),
            Arguments = new QueryArguments(new QueryArgument<NonNullGraphType<CompanyInputType>> { Name = "company" }),
            Resolver = new FuncFieldResolver<CompanyDto>(async context =>
            {
                var companyInput = context.GetArgument<CompanyDto>("company");
                return await companyService.AddAsync(companyInput);
            })
        });

    }
}