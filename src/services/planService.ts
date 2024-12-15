import { GET_PLANS } from '../queries/companyQueries';
import { Plan } from '../types/companyTypes';
import { client } from '../apollo';


// Service function to fetch plans
export const fetchPlans = async (): Promise<Plan[]> => {
    try {
      const { data } = await client.query<{ subscriptionPlanQueries: { plans: Plan[] } }>({
        query: GET_PLANS
      });
      return data?.subscriptionPlanQueries.plans;
    } catch (error) {
      console.error('Error fetching plans:', error);
      throw error;
    }
  }; 