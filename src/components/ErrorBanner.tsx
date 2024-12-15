import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useError } from '../context/ErrorContext';

const ErrorBanner: React.FC = () => {
    const { error, setError } = useError();

    const handleClose = () => {
        setError(null);
    };

    return (
        <Snackbar
            open={Boolean(error)}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ zIndex: 1301 }}
        >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    );
};

export default ErrorBanner; 