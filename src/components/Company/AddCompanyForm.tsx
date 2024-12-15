import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { ADD_COMPANY } from '../../queries/mutations/companyMutations';
import { Plan } from '../../types/companyTypes';
import { fetchPlans } from '../../services/planService';
import { useError } from '../../context/ErrorContext';

interface AddCompanyFormProps {
    onCompanyAdded: () => void;
}

const AddCompanyForm: React.FC<AddCompanyFormProps> = ({ onCompanyAdded }) => {
    const { setError } = useError();
    const [newCompanyName, setNewCompanyName] = useState('');
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [addCompany] = useMutation(ADD_COMPANY);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const loadPlans = async () => {
            try {
                const fetchedPlans = await fetchPlans();
                setPlans(fetchedPlans);
                if (fetchedPlans.length > 0) {
                    setSelectedPlanId(fetchedPlans[0].id);
                }
            } catch (error) {
                console.error('Error loading plans:', error);
                setError('Failed to load plans: '+error);
            }
        };

        loadPlans();
    }, [setError]);

    const handleAddCompany = async () => {
        if (newCompanyName.trim() && selectedPlanId !== null) {
            setLoading(true);
            try {
                await addCompany({ variables: { company: { name: newCompanyName, subscriptionPlanId: selectedPlanId } } });
                setNewCompanyName('');
                setSelectedPlanId(plans[0].id);
                onCompanyAdded(); 
            } catch (error) {
                console.error('Error adding company:', error);
                setError('Failed to add company.');
            } finally {
                setLoading(false);
            }
        }
    };

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
                    value={selectedPlanId || ''}
                    onChange={(e) => setSelectedPlanId(Number(e.target.value))}
                    label="Plan"
                >
                    {plans.map((plan: Plan) => (
                        <MenuItem key={plan.id} value={plan.id}>
                            {plan.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {loading ? (
                <CircularProgress size={24} />
            ) : (
                <Button variant="contained" color="primary" onClick={handleAddCompany}>
                    Add Company
                </Button>
            )}
        </Box>
    );
};

AddCompanyForm.propTypes = {
    onCompanyAdded: PropTypes.func.isRequired,
};

export default React.memo(AddCompanyForm);