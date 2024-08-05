const sqlite = require('better-sqlite3');
const path = require('path');

// Function to connect to the database and set up schema
const connectDatabase = (dbPath) => {
    const db = sqlite(dbPath, { verbose: console.log });

    // Create projects table with updated schema
    const createProjectsTable = `
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_name TEXT NOT NULL UNIQUE,
            code TEXT NOT NULL,
            overview TEXT,
            project_scope TEXT,
            project_goals_1 TEXT,
            project_goals_2 TEXT,
            exec_sponsor TEXT,
            business_product TEXT,
            process_owner TEXT,
            pm TEXT,
            dev TEXT,
            budget_actual_usd REAL,
            budget_planned_usd REAL,
            risk TEXT,
            milestones0 TEXT,
            milestones1 TEXT,
            milestones2 TEXT,
            milestones3 TEXT,
            milestones4 TEXT,
            milestones5 TEXT
        )
    `;
    db.exec(createProjectsTable);

    // Function to get all projects
    const getAllProjects = () => db.prepare('SELECT * FROM projects').all();
    
    // Function to get project by ID
    const getProjectById = (id) => db.prepare('SELECT * FROM projects WHERE id = ?').get(id);

    // Function to count all projects
    const countProjects = () => db.prepare('SELECT COUNT(*) AS count FROM projects').get().count;

    // Function to create a new project
    const createProject = (project) => {
        const insertStmt = db.prepare(`
            INSERT INTO projects (
                project_name, code, overview, project_scope, project_goals_1, project_goals_2,
                exec_sponsor, business_product, process_owner, pm, dev, budget_actual_usd,
                budget_planned_usd, risk, milestones0, milestones1, milestones2, milestones3,
                milestones4, milestones5
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        insertStmt.run(
            project.project_name,
            project.code,
            project.overview || null,
            project.project_scope || null,
            project.project_goals_1 || null,
            project.project_goals_2 || null,
            project.exec_sponsor || null,
            project.business_product || null,
            project.process_owner || null,
            project.pm || null,
            project.dev || null,
            project.budget_actual_usd || null,
            project.budget_planned_usd || null,
            project.risk || null,
            project.milestones0 || null,
            project.milestones1 || null,
            project.milestones2 || null,
            project.milestones3 || null,
            project.milestones4 || null,
            project.milestones5 || null
        );
    };

    // Function to get a project by name
    const getProjectByName = (projectName) => db.prepare('SELECT * FROM projects WHERE project_name = ?').get(projectName);

    // Function to delete a project by name
    const deleteProjectByName = (projectName) => {
        const deleteStmt = db.prepare('DELETE FROM projects WHERE project_name = ?');
        return deleteStmt.run(projectName);
    };

    // Function to update a project by name
    const updateProjectByName = (projectName, updatedData) => {
        const setClause = Object.keys(updatedData)
            .map(key => `${key} = ?`)
            .join(', ');

        const updateStmt = db.prepare(`
            UPDATE projects
            SET ${setClause}
            WHERE project_name = ?
        `);

        const values = [...Object.values(updatedData), projectName];
        return updateStmt.run(values);
    };

    // Function to insert sample data
    const insertSampleData = (projects) => {
        const insertStmt = db.prepare(`
            INSERT INTO projects (
                project_name, code, overview, project_scope, project_goals_1, project_goals_2,
                exec_sponsor, business_product, process_owner, pm, dev, budget_actual_usd,
                budget_planned_usd, risk, milestones0, milestones1, milestones2, milestones3,
                milestones4, milestones5
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        projects.forEach(project => {
            insertStmt.run(
                project.project_name,
                project.code,
                project.overview || null,
                project.project_scope || null,
                project.project_goals_1 || null,
                project.project_goals_2 || null,
                project.exec_sponsor || null,
                project.business_product || null,
                project.process_owner || null,
                project.pm || null,
                project.dev || null,
                project.budget_actual_usd || null,
                project.budget_planned_usd || null,
                project.risk || null,
                project.milestones0 || null,
                project.milestones1 || null,
                project.milestones2 || null,
                project.milestones3 || null,
                project.milestones4 || null,
                project.milestones5 || null
            );
        });

        console.log('Sample data inserted.');
    };

    return {
        getAllProjects,
        getProjectById,
        countProjects,
        createProject,
        getProjectByName,
        deleteProjectByName,
        updateProjectByName,
        insertSampleData
    };
};

module.exports = connectDatabase;
