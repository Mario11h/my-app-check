const express = require('express');
const path = require('path');
const connectDatabase = require('./db/statements');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const dbPath = path.resolve(__dirname, process.env.DB_PATH || './db/database.db');

// Middleware
app.use(express.json()); // To parse JSON bodies

// Connect to SQLite database
const db = connectDatabase(dbPath);

// GET endpoint to fetch all projects
app.get('/projects', (req, res) => {
    try {
        const projects = db.getAllProjects();
        res.json(projects);
    } catch (error) {
        console.error('Error fetching all projects:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/projects/:id', (req, res) => {
    try {
        const project = db.getProjectById(req.params.id);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (error) {
        console.error(`Error fetching project with id ${req.params.id}:`, error.message);
        res.status(500).json({ error: error.message });
    }
});

// GET endpoint to count all projects
app.get('/projects/count', (req, res) => {
    try {
        const count = db.countProjects();
        res.json({ count });
    } catch (error) {
        console.error('Error counting projects:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// POST endpoint to create a new project
app.post('/projects', (req, res) => {
    try {
        db.createProject(req.body);
        res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        console.error('Error creating project:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// DELETE endpoint to delete project by name
app.delete('/projects', (req, res) => {
    const { projectName } = req.body; // Expecting project name in the request body
    console.log(`Received DELETE request for project: ${projectName}`);
    
    if (!projectName) {
        return res.status(400).json({ error: 'Project name is required' });
    }

    try {
        const result = db.deleteProjectByName(projectName);
        console.log('Delete result:', result);
        if (result.changes > 0) {
            console.log('Project deleted successfully');
            return res.status(200).json({ message: 'Project deleted successfully' });
        } else {
            console.log(`No project found with name ${projectName}`);
            return res.status(404).json({ error: 'Project not found' });
        }
    } catch (error) {
        console.error(`Error deleting project with name ${projectName}:`, error.message);
        return res.status(500).json({ error: 'Failed to delete project' });
    }
});
app.get('/projects/name/:name', (req, res) => {
    try {
        const project = db.getProjectByName(req.params.name);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ error: 'Project not found' });
        }
    } catch (error) {
        console.error(`Error fetching project with name ${req.params.name}:`, error.message);
        res.status(500).json({ error: error.message });
    }
});
// PUT endpoint to update a project by name
app.put('/projects', (req, res) => {
    const { projectName, updatedData } = req.body; // Expecting project name and updated data in the request body
    console.log(`Received PUT request to update project: ${projectName}`);
    
    if (!projectName || !updatedData) {
        return res.status(400).json({ error: 'Project name and updated data are required' });
    }

    try {
        const result = db.updateProjectByName(projectName, updatedData);
        console.log('Update result:', result);
        if (result.changes > 0) {
            console.log('Project updated successfully');
            return res.status(200).json({ message: 'Project updated successfully' });
        } else {
            console.log(`No project found with name ${projectName}`);
            return res.status(404).json({ error: 'Project not found' });
        }
    } catch (error) {
        console.error(`Error updating project with name ${projectName}:`, error.message);
        return res.status(500).json({ error: 'Failed to update project' });
    }
});

// GET endpoint for root
app.get('/', (req, res) => {
    res.send('Server is running. Use /projects to fetch projects.');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
