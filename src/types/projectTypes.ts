import { ID } from './types';

export interface Project {
    id: ID;
    name: string;
    description: string;
    companyId: ID | null;
    company?: {
        id: ID;
        name: string;
    };
    teams?: {
        id: ID;
        name: string;
    }[];
}

export type NewProject = Omit<Project, 'id' | 'teams' | 'company'>;