using Feedback.Core.Entities;

namespace Feedback.Core.Interfaces
{
    public interface ICompanyRepository
    {
        Task<IEnumerable<Company>> GetAllCompaniesAsync();
        Task<Company> GetCompanyByIdAsync(int id);
        Task<Company> AddAsync(Company company);
    }
}