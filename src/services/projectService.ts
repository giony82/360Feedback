import { client } from '../apollo';
import { GET_PROJECTS } from '../queries/projectQueries';
import { ADD_PROJECT } from '../queries/mutations/projectMutations';
import { Project } from '../types';

interface ProjectQueryResult {
  projectQueries: {
    projects: Project[];
  }
}

class ProjectService {
  fetchProjects = async (): Promise<Project[]> => {
    try {
      const { data } = await client.query<ProjectQueryResult>({
        query: GET_PROJECTS,
        fetchPolicy: 'network-only'
      });
      return data.projectQueries.projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  };

  addProject = async (projectData: { name: string; companyId: number }): Promise<Project> => {
    try {
      const { data } = await client.mutate({
        mutation: ADD_PROJECT,
        variables: { project: projectData },
        refetchQueries: [{ query: GET_PROJECTS }]
      });
      return data.projectMutations.addProject;
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  }
}

export default new ProjectService();