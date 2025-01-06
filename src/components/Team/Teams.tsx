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
import TeamService from '../../services/teamService';
import { Team } from '../../types';
import styles from './Teams.module.css';
import AddTeamForm from './AddTeamForm';
import { useSortableData } from '../../hooks/useSortableData';
import { useError } from '../../context/ErrorContext';

const headerCells = [
    { id: 'name', label: 'Team Name' },
    { id: 'project', label: 'Project' },
    { id: 'description', label: 'Description' },
];

const Teams: React.FC = () => {
    const { setError } = useError();
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(false);
    
    const { items: sortedTeams, sortConfig, requestSort } = useSortableData(teams, 'name');

    const loadTeams = async () => {
        try {
            setLoading(true);
            const data = await TeamService.fetchTeams();            
            setTeams(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTeams();
    }, [setError]);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                Teams
            </Typography>

            <AddTeamForm onTeamAdded={loadTeams}/>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headerCells.map((headerCell) => (
                                <TableCell key={headerCell.id} className={styles.headerCell}>
                                    <TableSortLabel
                                        active={sortConfig.key === headerCell.id}
                                        direction={sortConfig.key === headerCell.id ? sortConfig.direction : 'asc'}
                                        onClick={() => requestSort(headerCell.id as keyof Team)}
                                    >
                                        <strong>{headerCell.label}</strong>
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell className={styles.headerCell}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && sortedTeams.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No teams found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedTeams.map((team, index) => (
                                <TableRow key={team.id} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                    <TableCell>{team.name}</TableCell>
                                    <TableCell>{team.project?.name}</TableCell>                                    
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

export default Teams;
