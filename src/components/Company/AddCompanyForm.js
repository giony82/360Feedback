import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useMutation, useQuery, gql } from '@apollo/client';
import { GET_PLANS } from '../../queries/companyQueries'; // Import the query

// Define the GraphQL mutation
const ADD_COMPANY = gql`
    mutation AddCompany($company: CompanyInput!) {
        companyMutations {
            addCompany(company: $company) {            
                name,
                subscriptionPlanId            
            }
        }
    }
`;

const AddCompanyForm = ({ onCompanyAdded }) => {
    const [newCompanyName, setNewCompanyName] = useState('');
    const [selectedPlanId, setSelectedPlanId] = useState(1); // Default to Free plan
    const [addCompany] = useMutation(ADD_COMPANY);
    
    // Fetch plans
    //const { loading: loadingPlans, error: errorPlans, data: plansData } = useQuery(GET_PLANS);
    var plansData = { plans:[{id:4, name:"Free"}] };

    const handleAddCompany = async () => {
        if (newCompanyName.trim()) {
            try {
                await addCompany({ variables: { company: { name: newCompanyName, subscriptionPlanId: selectedPlanId } } });
                setNewCompanyName('');
                setSelectedPlanId(1); // Reset to default plan
                onCompanyAdded(); 
            } catch (error) {
                console.error('Error adding company:', error);
            }
        }
    };

    //if (loadingPlans) return <p>Loading plans...</p>;
    //if (errorPlans) return <p>Error fetching plans: {errorPlans.message}</p>;

    return (
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <TextField
                variant="outlined"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                placeholder="Enter company name"
                sx={{ mr: 2 }}
            />
            <FormControl variant="outlined" sx={{ mr: 2, minWidth: 120 }}>
                <InputLabel id="plan-select-label">Plan</InputLabel>
                <Select
                    labelId="plan-select-label"
                    value={selectedPlanId}
                    onChange={(e) => setSelectedPlanId(e.target.value)}
                    label="Plan"
                >
                    {plansData.plans.map((plan) => (
                        <MenuItem key={plan.id} value={plan.id}>
                            {plan.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleAddCompany}>
                Add Company
            </Button>
        </Box>
    );
};

export default AddCompanyForm; 