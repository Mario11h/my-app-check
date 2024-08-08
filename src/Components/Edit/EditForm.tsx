import React, { useState, useEffect } from 'react';
import {
  Autocomplete, TextField, Button, Grid, Container,
  Tooltip, IconButton, Zoom, Typography, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Paper, Snackbar, Alert,
  Box
} from '@mui/material';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Draggable from 'react-draggable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { validateProjectForm } from './EditValidator'; // Ensure this path is correct
import { SetupFormValues } from './Type';
import { images } from '../Assets/DummyData';

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

function PaperComponent(props: any) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const DraggableDialog: React.FC<{ open: boolean; onClose: (confirmed: boolean) => void }> = ({ open, onClose }) => (
  <Dialog open={open} onClose={() => onClose(false)} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
      Confirm Submission
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to update the project details?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={() => onClose(false)} color="primary">
        Cancel
      </Button>
      <Button onClick={() => onClose(true)} color="primary">
        Submit
      </Button>
    </DialogActions>
  </Dialog>
);

const Edit: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [initialValues, setInitialValues] = useState<Partial<SetupFormValues>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState<Partial<SetupFormValues> | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  const handleProjectChange = (event: React.ChangeEvent<{}>, value: Project | null) => {
    if (value) {
      axios.get(`/projects/name/${value.project_name}`)
        .then(response => {
          setSelectedProject(response.data);
          setInitialValues(response.data);
        })
        .catch(error => console.error('Error fetching project details:', error));
    } else {
      setSelectedProject(null);
      setInitialValues({});
    }
  };

  const onSubmit = async (values: Partial<SetupFormValues>) => {
    setFormValues(values);
    setDialogOpen(true); // Open the confirmation dialog
  };

  const handleDialogClose = async (confirmed: boolean) => {
    setDialogOpen(false);

    if (confirmed && formValues && selectedProject) {
      const validationErrors = await validateProjectForm(formValues);
      if (Object.keys(validationErrors).length > 0) {
        return validationErrors;
      }

      try {
        await axios.put('/projects', {
          projectName: selectedProject.project_name,
          updatedData: formValues
        });
        setSnackbarOpen(true); // Show success message
        setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
      } catch (error) {
        console.error('Error updating project:', error);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const renderTextField = (name: string, label: string, type: string = 'text') => (
    <Grid item xs={12} sm={6} key={name}>
      <Field name={name}>
        {({ input, meta }: any) => (
          <TextField
            {...input}
            label={label}
            type={type}
            variant="outlined"
            fullWidth
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            InputLabelProps={{
              required: true,
              sx: { '& .MuiFormLabel-asterisk': { color: 'red' } }
            }}
            InputProps={{
              sx: {
                color: initialValues[name as keyof SetupFormValues] === input.value
                  ? 'rgba(7,62,183,1)'
                  : 'inherit'
              }
            }}
          />
        )}
      </Field>
    </Grid>
  );

  return (
    <Container>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0, // Use bottom instead of top
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${images[1].imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          zIndex: -1,
        }}
      />
      <Tooltip title="Go Back" TransitionComponent={Zoom} arrow>
        <IconButton onClick={() => navigate('/')} color="secondary" sx={{ '&:hover svg': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}>
          <ArrowBackIcon sx={{ color: 'rgba(4, 36, 106, 1)' }} />
        </IconButton>
      </Tooltip>
      <Typography style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', marginBottom: '16px', fontSize: '20px' }}>Edit Projects</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={projects}
            getOptionLabel={(option) => option.project_name}
            onChange={handleProjectChange}
            renderInput={(params) => <TextField {...params} label="Select Project" variant="outlined" />}
          />
        </Grid>
        {selectedProject && (
          <Grid item xs={12}>
            <Form
              validate={validateProjectForm}
              onSubmit={onSubmit}
              initialValues={selectedProject}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    {renderTextField('project_name', 'Project Name')}
                    {renderTextField('code', 'Code')}
                    <Grid item xs={6}>
                      <Field name="overview">
                        {({ input, meta }: any) => (
                          <TextField
                            label="Overview"
                            {...input}
                            fullWidth
                            multiline
                            rows={4}
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                            InputLabelProps={{
                              required: true,
                              sx: { '& .MuiFormLabel-asterisk': { color: 'red' } }
                            }}
                            InputProps={{
                              sx: {
                                color: initialValues.overview === input.value
                                  ? 'rgba(7,62,183,1)'
                                  : 'inherit'
                              }
                            }}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field name="project_scope">
                        {({ input, meta }: any) => (
                          <TextField
                            label="Project Scope"
                            {...input}
                            fullWidth
                            multiline
                            rows={4}
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                            InputLabelProps={{
                              required: true,
                              sx: { '& .MuiFormLabel-asterisk': { color: 'red' } }
                            }}
                            InputProps={{
                              sx: {
                                color: initialValues.project_scope === input.value
                                  ? 'rgba(7,62,183,1)'
                                  : 'inherit'
                              }
                            }}
                          />
                        )}
                      </Field>
                    </Grid>
                    {renderTextField('project_goals_1', 'Project Goals 1')}
                    {renderTextField('project_goals_2', 'Project Goals 2')}
                    {renderTextField('exec_sponsor', 'Executive Sponsor')}
                    {renderTextField('business_product', 'Business Product')}
                    {renderTextField('process_owner', 'Process Owner')}
                    {renderTextField('pm', 'Project Manager')}
                    {renderTextField('dev', 'Developer')}
                    {renderTextField('risk', 'Risk')}
                    {renderTextField('budget_actual_usd', 'Budget Actual USD', 'number')}
                    {renderTextField('budget_planned_usd', 'Budget Planned USD', 'number')}

                    {Array.from({ length: 6 }, (_, i) => {
                      const minDate = i === 0
                        ? new Date().toISOString().split('T')[0]
                        : (values[`milestones${i - 1}`] || new Date().toISOString().split('T')[0]);
                      const label = i === 0 ? 'Project Start Date' : i === 5 ? 'Project End Date' : `Milestone ${i}`;
                      return (
                        <Grid item xs={6} key={i}>
                          <Field name={`milestones${i}`}>
                            {({ input, meta }: any) => (
                              <TextField
                                label={label}
                                {...input}
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                error={meta.touched && Boolean(meta.error)}
                                helperText={meta.touched && meta.error}
                                InputProps={{
                                  inputProps: { min: minDate },
                                  sx: {
                                    color: initialValues[`milestones${i}`] === input.value
                                      ? 'rgba(191,191,191,1)'
                                      : 'inherit'
                                  }
                                }}
                              />
                            )}
                          </Field>
                        </Grid>
                      );
                    })}

                    <Grid item xs={12} container justifyContent="flex-end">
                      <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: 'rgba(4, 36, 106, 1)' }}>
                        Update Project
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </Grid>
        )}
      </Grid>
      <DraggableDialog open={dialogOpen} onClose={handleDialogClose} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
          },
        }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Project updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Edit;
