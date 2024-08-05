import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store'; // Ensure RootState is imported correctly

// Define Project type
interface Project {
    id: number;
    project_name: string;
    code: string;
    overview?: string;
    project_scope?: string;
    project_goals_1?: string;
    project_goals_2?: string;
    exec_sponsor?: string;
    business_product?: string;
    process_owner?: string;
    pm?: string;
    dev?: string;
    budget_actual_usd?: number;
    budget_planned_usd?: number;
    risk?: string;
    milestones0?: string;
    milestones1?: string;
    milestones2?: string;
    milestones3?: string;
    milestones4?: string;
    milestones5?: string;
}

// Define the status type
type Status = 'loading' | 'succeeded' | 'failed';

export const fetchProjects = createAsyncThunk<Project[], void, { state: RootState }>(
    'projects/fetchProjects',
    async (_, { getState, rejectWithValue }) => {
        try {
            const response = await axios.get('/projects');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateProject = createAsyncThunk<Project, { projectId: number, updatedData: Partial<Project> }, { state: RootState }>(
    'projects/updateProject',
    async ({ projectId, updatedData }, { getState, rejectWithValue }) => {
        try {
            const response = await axios.put(`/projects/${projectId}`, updatedData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
  
// Slice definition
const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [] as Project[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(updateProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProject = action.payload;
                const index = state.projects.findIndex((project) => project.id === updatedProject.id);
                if (index !== -1) {
                    state.projects[index] = updatedProject;
                }
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            });
    },
});

export default projectsSlice.reducer;
