using AutoMapper;
using Feedback.Application.Contracts.DTOs;
using Feedback.Application.Contracts.Interfaces;
using Feedback.Core.Entities;
using Feedback.Core.Interfaces;

namespace Feedback.Application.Services;

public class CompanyService(ICompanyRepository companyRepository, IMapper mapper) : ICompanyService
{
    public async Task<IEnumerable<CompanyDto>> GetAllCompaniesAsync()
    {
        var companies = await companyRepository.GetAllCompaniesAsync();
        return mapper.Map<IEnumerable<CompanyDto>>(companies);
    }

    public async Task<CompanyDto> GetCompanyByIdAsync(int id)
    {
        Company? company = await companyRepository.GetCompanyByIdAsync(id);
        return mapper.Map<CompanyDto>(company);
    }

    public async Task<CompanyDto> AddAsync(CompanyDto companyInput)
    {
        var company = mapper.Map<Company>(companyInput);
        var newCompany=await companyRepository.AddAsync(company);
        return mapper.Map<CompanyDto>(newCompany);
    }
}