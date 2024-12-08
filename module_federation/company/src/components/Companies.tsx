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
import CompanyService from '../services/companyService';
import { Company } from '../types';
import AddCompanyForm from './AddCompanyForm';
import * as companyStyles from './Companies.module.css'


const headerCells = [
    { id: 'name', label: 'Company Name' },
    { id: 'projects', label: 'Projects' },
    { id: 'teams', label: 'Teams' },
];

const Companies: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Company; direction: 'asc' | 'desc' }>({ 
        key: 'name', 
        direction: 'asc' 
    });

    const loadCompanies = async () => {
        try {
            setLoading(true);
            const data = await CompanyService.fetchCompanies();
            console.log("Fetched companies:", data);
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
        console.log("Adding company, refreshing list...");
        loadCompanies();
    };

    const sortedCompanies = React.useMemo(() => {
        return [...companies].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'asc' ? 
                    aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
            return 0;
        });
    }, [companies, sortConfig]);

    const requestSort = (key: keyof Company) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };
    
    if (error) return <p>Error fetching companies: {error}</p>;

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
                                <TableCell key={headerCell.id} className={companyStyles.headerCell}>
                                    <TableSortLabel
                                        active={sortConfig.key === headerCell.id}
                                        direction={sortConfig.key === headerCell.id ? sortConfig.direction : 'asc'}
                                        onClick={() => requestSort(headerCell.id as keyof Company)}
                                    >
                                        <strong>{headerCell.label}</strong>
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell className={companyStyles.headerCell}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && 
                        sortedCompanies.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    You don't have any companies yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedCompanies.map((company, index) => (
                                <TableRow key={company.id} className={index % 2 === 0 ? companyStyles.evenRow : companyStyles.oddRow}>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.projects}</TableCell>
                                    <TableCell>{company.teams}</TableCell>
                                    <TableCell>
                                        <Button variant="text" color="primary">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        {
                            (loading && <TableRow><TableCell colSpan={5}><CircularProgress /></TableCell></TableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Companies;