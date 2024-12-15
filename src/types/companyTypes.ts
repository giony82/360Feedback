
// Define types for the company data
export interface Company {
    id: string;
    name: string;
    projects: number; // Assuming projects is a number, adjust if necessary
    teams: number; // Assuming teams is a number, adjust if necessary
}

// Define the Plan interface
export interface Plan {
    id: number;
    name: string;
}