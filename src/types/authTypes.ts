import { AxiosInstance } from 'axios';
import { User } from './userTypes'; 

// Update the AuthContextType to use the User interface
export interface AuthContextType {
    user: User; 
    login: (provider: any, credential: any) => Promise<void>;
    logout: () => void;
    loading: boolean;
    error: string | null; 
    api: AxiosInstance;
}

export interface CredentialResponse {
    credential: string;
}