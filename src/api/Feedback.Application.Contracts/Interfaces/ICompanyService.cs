using Feedback.Application.Contracts.DTOs;

namespace Feedback.Application.Contracts.Interfaces;

public interface ICompanyService
{
    Task<IEnumerable<CompanyDto>> GetAllCompaniesAsync();
    Task<CompanyDto> GetCompanyByIdAsync(int id);
    Task<CompanyDto> AddAsync(CompanyDto companyInput);
}