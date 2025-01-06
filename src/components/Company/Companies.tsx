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
import CompanyService from '../../services/companyService';
import { Company } from '../../types';
import AddCompanyForm from './AddCompanyForm';
import styles from './Companies.module.css';
import { useSortableData } from '../../hooks/useSortableData';
import { useError } from '../../context/ErrorContext';


const headerCells = [
    { id: 'name', label: 'Company Name' },
    { id: 'projects', label: 'Projects' },
    { id: 'teams', label: 'Teams' },
];

const Companies: React.FC = () => {
    const { setError } = useError();
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(false);
    
    const { items: sortedCompanies, sortConfig, requestSort } = useSortableData(companies, 'name');

    const loadCompanies = async () => {
        try {
            setLoading(true);
            const data = await CompanyService.fetchCompanies();
            setCompanies(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCompanies();
    }, []);

    const handleCompanyAdded = () => {        
        loadCompanies();
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                Manage Companies
            </Typography>

            <AddCompanyForm onCompanyAdded={handleCompanyAdded}/>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headerCells.map((headerCell) => (
                                <TableCell key={headerCell.id} className={styles.headerCell}>
                                    <TableSortLabel
                                        active={sortConfig.key === headerCell.id}
                                        direction={sortConfig.key === headerCell.id ? sortConfig.direction : 'asc'}
                                        onClick={() => requestSort(headerCell.id as keyof Company)}
                                    >
                                        <strong>{headerCell.label}</strong>
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell className={styles.headerCell}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && sortedCompanies.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    You don't have any companies yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedCompanies.map((company, index) => (
                                <TableRow key={company.id} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.projects}</TableCell>
                                    <TableCell>{company.teams}</TableCell>
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

export default Companies;