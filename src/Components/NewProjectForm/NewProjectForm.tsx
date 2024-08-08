import React, { useState } from 'react';
import {
  Box, Button, Grid, TextField, LinearProgress, IconButton, Tooltip, Zoom, Typography,
  Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper
} from '@mui/material';
import { Form, Field } from 'react-final-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProjectFormValues } from './Type';
import { validateProjectForm, isFieldRequired } from './ProjectValidator';
import { images } from '../Assets/DummyData';  

const LinearIndeterminate: React.FC = () => (
  <Box sx={{ width: '100%' }}>
    <LinearProgress />
  </Box>
);

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
        Are you sure you want to submit the project details?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={() => onClose(false)} color="primary">
        Cancel
      </Button>
      <Button onClick={() => onClose(true)} color="primary">
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

const NewProjectForm: React.FC<{ onProjectAdded: () => void }> = ({ onProjectAdded }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState<ProjectFormValues | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const onSubmit = async (values: ProjectFormValues) => {
    setFormValues(values);
    setDialogOpen(true); // Open the confirmation dialog
  };

  const handleDialogClose = async (confirmed: boolean) => {
    setDialogOpen(false);

    if (confirmed && formValues) {
      const validationErrors = await validateProjectForm(formValues);
      if (Object.keys(validationErrors).length > 0) {
        // Handle validation errors if any
        return;
      }

      setLoading(true);
      setShowLoader(true);

      try {
        await axios.post('/projects', formValues);
        setSnackbarOpen(true); // Show success message
        setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
      } catch (error) {
        setSnackbarMessage('Error saving project!');
        setSnackbarOpen(true); // Show error message
      } finally {
        setLoading(false);
        setShowLoader(false);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const renderTextField = (name: keyof ProjectFormValues, label: string, type: string = 'text', minDate?: string) => (
    <Field name={name} key={name}>
      {({ input, meta }: any) => (
        <Grid item xs={6}>
          <TextField
            label={label}
            {...input}
            type={type}
            fullWidth
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            InputLabelProps={{
              required: isFieldRequired(name),
              sx: { '& .MuiFormLabel-asterisk': { color: 'red' } }
            }}
            InputProps={minDate ? { inputProps: { min: minDate } } : {}}
          />
        </Grid>
      )}
    </Field>
  );

  const today = new Date().toISOString().split('T')[0];

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
         
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${images[1].imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          zIndex: -1,
        },
      }}
    >
      <Tooltip title="Go Back" TransitionComponent={Zoom} arrow>
        <IconButton
          onClick={() => navigate('/')}
          color="secondary"
          sx={{ '&:hover svg': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}
        >
          <ArrowBackIcon sx={{ color: 'rgba(4, 36, 106, 1)' }} />
        </IconButton>
      </Tooltip>
      <Typography
        style={{ fontFamily: 'Roboto ', color: 'black', fontWeight: 'bold', marginBottom: '16px', fontSize: '20px'  }}>Add Projects</Typography>

      <Form
        validate={validateProjectForm}
        onSubmit={onSubmit}
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
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      InputLabelProps={{
                        required: isFieldRequired('overview'),
                        sx: { '& .MuiFormLabel-asterisk': { color: 'red' } }
                      }}
                    />
                  )}
                </Field>
              </Grid>
              {renderTextField('project_scope', 'Project Scope')}
              {renderTextField('project_goals_1', 'Project Goals 1')}
              {renderTextField('project_goals_2', 'Project Goals 2')}
              {renderTextField('exec_sponsor', 'Executive Sponsor')}
              {renderTextField('business_product', 'Business Product')}
              {renderTextField('process_owner', 'Process Owner')}
              {renderTextField('pm', 'Project Manager')}
              {renderTextField('dev', 'Developer')}
              {renderTextField('risk', 'Risk')}
              {renderTextField('budget_actual_usd', 'Budget Actual (USD)', 'number')}
              {renderTextField('budget_planned_usd', 'Budget Planned (USD)', 'number')}

              {Array.from({ length: 6 }, (_, i) => {
                const minDate = i === 0 ? today : values[`milestones${i - 1}`] || today;
                let label: string;
                if (i === 0) {
                  label = "Project start date";
                } else if (i === 5) {
                  label = "Project end date";
                } else {
                  label = `Milestone ${i}`;
                }
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
                          sx={{ '& .MuiFormLabel-asterisk': { color: 'red' } }}
                          InputProps={{ inputProps: { min: minDate } }}
                        />
                      )}
                    </Field>
                  </Grid>
                );
              })}

              <Grid item xs={12} container justifyContent="flex-end">
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: 'rgba(4, 36, 106, 1)' }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>

              {showLoader && <LinearIndeterminate />}
            </Grid>
          </form>
        )}
      />

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
          Project Added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewProjectForm;
