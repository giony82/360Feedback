import { client } from '../apollo';
import { GET_COMPANIES } from '../queries/companyQueries';
import { ADD_COMPANY } from '../queries/mutations/companyMutations';
import { Company } from '../types';

interface CompanyQueryResult {
  companyQueries: {
    companies: Company[];
  }
}

class CompanyService {

  fetchCompanies = async (): Promise<Company[]> => {
    try {
      const { data } = await client.query<CompanyQueryResult>({
        query: GET_COMPANIES,
        fetchPolicy: 'network-only'
      });
      return data.companyQueries.companies;
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  };

  addCompany = async (companyData: Omit<Company, 'id'>): Promise<Company> => {
    try {
      const { data } = await client.mutate({
        mutation: ADD_COMPANY,
        variables: { input: companyData },
        refetchQueries: [{ query: GET_COMPANIES }]
      });
      return data.addCompany;
    } catch (error) {
      console.error('Error adding company:', error);
      throw error;
    }
  }
};

export default new CompanyService();