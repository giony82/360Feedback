import { useForm } from 'react-hook-form';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, CircularProgress, Grid2 as Grid } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_TEAM } from '../../queries/mutations/teamMutations';
import type { Project, NewTeam } from '../../types';
import ProjectService from '../../services/projectService';
import { useError } from '../../context/ErrorContext';
import { useEffect } from 'react';
import { useState } from 'react';

const INITIAL_TEAM_STATE: NewTeam = {
    name: '',
    description: '',
    projectId: null
} as const;

interface AddTeamFormProps {
    onTeamAdded: () => void;
}

const AddTeamForm = ({ onTeamAdded }: AddTeamFormProps) => {
    const { setError } = useError();
    const [projects, setProjects] = useState<Project[]>([]);
    const [addTeam] = useMutation(ADD_TEAM);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, watch } = useForm<NewTeam>({
        defaultValues: INITIAL_TEAM_STATE
    });

    const teamName = watch('name');
    const projectId = watch('projectId');

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const fetchedProjects = await ProjectService.fetchProjects();
                setProjects(fetchedProjects);
                if (fetchedProjects[0]) {
                    reset({ ...INITIAL_TEAM_STATE, projectId: fetchedProjects[0].id });
                }
            } catch (error: unknown) {
                setError(`Failed to load projects: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        };

        loadProjects();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        setLoading(true);
        try {
            await addTeam({ variables: { team: data } });
            reset({ ...INITIAL_TEAM_STATE, projectId: projects[0]?.id ?? null });
            onTeamAdded();
        } catch (error: unknown) {
            setError('Failed to add team.');
        } finally {
            setLoading(false);
        }
    });

    return (
        <Box component="form" onSubmit={onSubmit} sx={{ flexGrow: 1, maxWidth: "600px", mb:2}} >
            <Grid container spacing={2}>                
                    <Grid size={{ xs: 12, md: 6 }}>                        
                        <TextField
                            {...register('name')}                            
                            label="Team Name"
                            fullWidth
                            required
                        />                        
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>                        
                        <FormControl required fullWidth>
                            <InputLabel>Project</InputLabel>
                            <Select
                                {...register('projectId')}
                                label="Project"                                                                
                            >
                                {projects.map(({ id, name }) => (
                                    <MenuItem key={id} value={id}>{name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>                        
                    </Grid>                
                <Grid size={{ xs: 12, md: 12 }}>                    
                    <TextField
                        {...register('description')}
                        fullWidth
                        label="Description"
                        multiline
                        rows={3}                        
                    />                    
                </Grid>                
                <Grid size={{ xs: 4, md: 4 }}>                    
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!teamName?.trim() || !projectId || loading}
                        startIcon={loading && <CircularProgress size={20} />}                        
                    >
                        Add Team
                    </Button>                    
                </Grid>
            </Grid>
        </Box >
    );
};

export default AddTeamForm; 