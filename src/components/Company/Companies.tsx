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
import AddCompanyForm from './AddCompanyForm';
import { useQuery } from '@apollo/client';
import styles from './Companies.module.css';

import { GET_COMPANIES } from '../../queries/companyQueries';
import { Company } from '../../types';

const headerCells = [
    { id: 'name', label: 'Company Name' },
    { id: 'projects', label: 'Projects' },
    { id: 'teams', label: 'Teams' },
];

const Companies: React.FC = () => {
    const { loading, error, data, refetch } = useQuery<{ companyQueries: { companies: Company[] } }>(GET_COMPANIES);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Company; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });

    const sortedCompanies = React.useMemo(() => {
        if (!data || !data.companyQueries.companies) return [];
        return [...data.companyQueries.companies].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'asc' ? 
                aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
            }            
            return 0; // or handle as needed
        });
    }, [data, sortConfig]);

    const requestSort = (key: keyof Company) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    if (loading) return <CircularProgress />;
    if (error) return <p>Error fetching companies: {error.message}</p>;

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                Manage Companies
            </Typography>
            <AddCompanyForm onCompanyAdded={refetch} />

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
                        {sortedCompanies.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    You don't have any companies yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedCompanies.map((company) => (
                                <TableRow key={company.id}>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.projects}</TableCell>
                                    <TableCell>{company.teams}</TableCell>
                                    <TableCell>
                                        <Button variant="text" color="primary">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Companies;