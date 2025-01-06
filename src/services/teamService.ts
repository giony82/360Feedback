import { client } from '../apollo';
import { GET_TEAMS } from '../queries/teamQueries';
import type { Team } from '../types';

export class TeamService {
    static async fetchTeams(): Promise<Team[]> {
        const { data } = await client.query({
            query: GET_TEAMS
        });
        return data.teamQueries.teams;
    }
}

export default TeamService; 