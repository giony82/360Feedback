import React, { useState, useEffect } from 'react';
import { 
    TextField, 
    Button, 
    Box, 
    MenuItem, 
    Select, 
    InputLabel, 
    FormControl, 
    CircularProgress,
    Grid 
} from '@mui/material';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { ADD_PROJECT } from '../../queries/mutations/projectMutations';
import { Company } from '../../types';
import CompanyService from '../../services/companyService';
import { useError } from '../../context/ErrorContext';

interface AddProjectFormProps {
    onProjectAdded: () => void;
}

const AddProjectForm: React.FC<AddProjectFormProps> = ({ onProjectAdded }) => {
    const { setError } = useError();
    const [newProjectName, setNewProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [addProject] = useMutation(ADD_PROJECT);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const loadCompanies = async () => {
            try {
                const fetchedCompanies = await CompanyService.fetchCompanies();
                setCompanies(fetchedCompanies);
                if (fetchedCompanies.length > 0) {
                    setSelectedCompanyId(fetchedCompanies[0].id);
                }
            } catch (error) {                
                setError('Failed to load companies: ' + error);
            }
        };

        loadCompanies();
    }, [setError]);

    const handleAddProject = async () => {
        if (newProjectName.trim() && selectedCompanyId !== null) {
            setLoading(true);
            try {
                await addProject({ 
                    variables: { 
                        project: { 
                            name: newProjectName, 
                            description: description.trim(),
                            companyId: selectedCompanyId 
                        } 
                    } 
                });
                // Reset form
                setNewProjectName('');
                setDescription('');
                setSelectedCompanyId(companies[0]?.id || null);
                onProjectAdded();
            } catch (error) {                
                setError('Failed to add project.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        placeholder="Enter project name"
                        label="Project Name"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="company-select-label">Company</InputLabel>
                        <Select
                            labelId="company-select-label"
                            value={selectedCompanyId || ''}
                            onChange={(e) => setSelectedCompanyId(Number(e.target.value))}
                            label="Company"
                        >
                            {companies.map((company: Company) => (
                                <MenuItem key={company.id} value={company.id}>
                                    {company.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter project description"
                        label="Description"
                        multiline
                        rows={3}
                    />
                </Grid>
                <Grid item xs={12}>
                    {loading ? (
                        <CircularProgress size={24} />
                    ) : (
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleAddProject}
                            disabled={!newProjectName.trim() || selectedCompanyId === null}
                        >
                            Add Project
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

AddProjectForm.propTypes = {
    onProjectAdded: PropTypes.func.isRequired,
};

export default React.memo(AddProjectForm); 