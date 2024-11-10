using Feedback.Core.Entities;
using Feedback.Core.Interfaces;
using Feedback.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Feedback.Infrastructure.Repositories;

public class CompanyRepository(AppDbContext appDbContext) : ICompanyRepository
{
    public async Task<IEnumerable<Company>> GetAllCompaniesAsync()
    {
        return await appDbContext.Companies.ToListAsync();
    }

    public async Task<Company> GetCompanyByIdAsync(int id)
    {
        // Implement data access logic here
        return await appDbContext.Companies.FindAsync(id);
    }

    public async Task<Company> AddAsync(Company company)
    {
        appDbContext.Add(company);
        await appDbContext.SaveChangesAsync();
        return company;
    }
}