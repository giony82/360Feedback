import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useMutation, useQuery, gql } from '@apollo/client';
import PropTypes from 'prop-types'; // Import PropTypes

// Define the GraphQL mutation
import { ADD_COMPANY } from '../../queries/mutations/companyMutations';

const AddCompanyForm = ({ onCompanyAdded }: { onCompanyAdded: () => void }) => {
    const [newCompanyName, setNewCompanyName] = useState('');
    const [selectedPlanId, setSelectedPlanId] = useState(4); // Default to Free plan
    const [addCompany] = useMutation(ADD_COMPANY);
    
    // Fetch plans
    // TODO
    //const { loading: loadingPlans, error: errorPlans, data: plansData } = useQuery(GET_PLANS);
    var plansData = { plans:[{id:4, name:"Free"}] };

    const handleAddCompany = async () => {
        if (newCompanyName.trim()) {
            try {
                await addCompany({ variables: { company: { name: newCompanyName, subscriptionPlanId: selectedPlanId } } });
                setNewCompanyName('');
                setSelectedPlanId(4); // Reset to default plan
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
                    onChange={(e) => setSelectedPlanId(Number(e.target.value))}
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

// Add prop types validation
AddCompanyForm.propTypes = {
    onCompanyAdded: PropTypes.func.isRequired, // Validate the prop type
};

export default AddCompanyForm; 