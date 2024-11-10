using Feedback.Application.Contracts.DTOs;
using Feedback.Application.Contracts.Interfaces;
using GraphQL.Resolvers;
using GraphQL.Types;

public class CompanyQuery : ObjectGraphType
{
    public CompanyQuery(ICompanyService companyService)
    {
        AddField(new FieldType
        {
            Name = "companies",
            Type = typeof(ListGraphType<CompanyType>),
            Resolver = new FuncFieldResolver<IEnumerable<CompanyDto>>(async context =>
            {
                var users = await companyService.GetAllCompaniesAsync();
                return users;
            })
        });
    }
}