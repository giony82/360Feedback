import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress,
    TableSortLabel,
} from '@mui/material';
import ProjectService from '../../services/projectService';
import { Project } from '../../types';
import styles from './Projects.module.css';
import AddProjectForm from './AddProjectForm';
import { useSortableData } from '../../hooks/useSortableData';

const headerCells = [
    { id: 'name', label: 'Project Name' },
    { id: 'company', label: 'Company' },
    { id: 'teams', label: 'Teams' },
];

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const { items: sortedProjects, sortConfig, requestSort } = useSortableData(projects, 'name');

    const loadProjects = async () => {
        try {
            setLoading(true);
            const data = await ProjectService.fetchProjects();            
            setProjects(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    if (error) return <p>Error fetching projects: {error}</p>;

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                Projects
            </Typography>

            <AddProjectForm onProjectAdded={loadProjects}/>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headerCells.map((headerCell) => (
                                <TableCell key={headerCell.id} className={styles.headerCell}>
                                    <TableSortLabel
                                        active={sortConfig.key === headerCell.id}
                                        direction={sortConfig.key === headerCell.id ? sortConfig.direction : 'asc'}
                                        onClick={() => requestSort(headerCell.id as keyof Project)}
                                    >
                                        <strong>{headerCell.label}</strong>
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell className={styles.headerCell}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && sortedProjects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No projects found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedProjects.map((project, index) => (
                                <TableRow key={project.id} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                    <TableCell>{project.name}</TableCell>
                                    <TableCell>{project.company?.name}</TableCell>
                                    <TableCell>{project.teams?.length || 0}</TableCell>
                                    <TableCell>
                                        <Button variant="text" color="primary">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Projects;