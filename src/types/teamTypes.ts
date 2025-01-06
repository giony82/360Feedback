import { ID } from './types';

export interface Team {
    id: ID;
    name: string;
    description: string;
    projectId: ID | null;
    project?: {
        id: ID;
        name: string;
    };
}
export type NewTeam = Omit<Team, 'id'>;