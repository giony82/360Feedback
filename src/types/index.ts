export * from './companyTypes';
export * from './authTypes';

export interface Project {
    id: string;
    name: string;
    company?: {
        id: string;
        name: string;
    };
    teams?: {
        id: string;
        name: string;
    }[];
}