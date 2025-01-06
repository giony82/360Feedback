import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
    TextField, 
    Button, 
    Box, 
    MenuItem, 
    Select, 
    InputLabel, 
    FormControl, 
    CircularProgress,
    Grid2 as Grid
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../queries/mutations/projectMutations';
import { Company, NewProject } from '../../types';
import CompanyService from '../../services/companyService';
import { useError } from '../../context/ErrorContext';

interface AddProjectFormProps {
    onProjectAdded: () => void;
}

const INITIAL_PROJECT_STATE: NewProject = {
    name: '',
    description: '',
    companyId: null
} as const;

const AddProjectForm: React.FC<AddProjectFormProps> = ({ onProjectAdded }) => {
    const { setError } = useError();
    const [project, setProject] = useState<NewProject>(INITIAL_PROJECT_STATE);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [addProject] = useMutation(ADD_PROJECT);
    const [loading, setLoading] = useState(false);
    
    const { handleSubmit, reset } = useForm<NewProject>({
        defaultValues: INITIAL_PROJECT_STATE
    });

    useEffect(() => {
        const loadCompanies = async () => {
            try {
                const fetchedCompanies = await CompanyService.fetchCompanies();
                setCompanies(fetchedCompanies);
                if (fetchedCompanies.length > 0) {
                    setProject(p => ({ ...p, companyId: fetchedCompanies[0].id }));
                }
            } catch (error) {                
                setError(`Failed to load companies: ${error}`);
            }
        };

        loadCompanies();
    }, [setError]);

    const onSubmit = handleSubmit(async (data: NewProject) => {
        setLoading(true);
        try {
            await addProject({ variables: { project: data } });
            reset({ ...INITIAL_PROJECT_STATE, companyId: companies[0]?.id ?? null });
            onProjectAdded();
        } catch (error) {
            setError('Failed to add project.');
        } finally {
            setLoading(false);
        }
    });

    return (
        <Box component="form" onSubmit={onSubmit} sx={{ flexGrow: 1, maxWidth: "600px", mb:2}} >
            <Grid container spacing={2}>                
            <Grid size={{ xs: 12, md: 6 }}>   
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={project.name}
                        onChange={(e) => setProject(p => ({ ...p, name: e.target.value }))}
                        placeholder="Enter project name"
                        label="Project Name"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>   
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="company-select-label">Company</InputLabel>
                        <Select
                            labelId="company-select-label"
                            value={project.companyId || ''}
                            onChange={(e) => setProject(p => ({ ...p, companyId: Number(e.target.value) }))}
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
                <Grid size={{ xs: 12 }}>   
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={project.description}
                        onChange={(e) => setProject(p => ({ ...p, description: e.target.value }))}
                        placeholder="Enter project description"
                        label="Description"
                        multiline
                        rows={3}
                    />
                </Grid>
                <Grid size={{ xs: 4, md: 4 }}>       
                    {loading ? (
                        <CircularProgress size={24} />
                    ) : (
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={onSubmit}
                            disabled={!project.name.trim() || project.companyId === null}
                        >
                            Add Project
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default React.memo(AddProjectForm); 