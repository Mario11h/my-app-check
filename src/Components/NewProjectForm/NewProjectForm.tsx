import React, { useState } from 'react';
import { Box, Button, Grid, TextField, LinearProgress, IconButton, Tooltip, Zoom } from '@mui/material';
import { Form, Field } from 'react-final-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ProjectFormValues } from './Type';
import { validateProjectForm, isFieldRequired } from './ProjectValidator';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LinearIndeterminate: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );
};

interface NewProjectFormProps {
  onProjectAdded: () => void;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({ onProjectAdded }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const onSubmit = async (values: ProjectFormValues) => {
    const validationErrors = await validateProjectForm(values);
    if (Object.keys(validationErrors).length > 0) {
      return validationErrors;
    }

    setLoading(true); // Set loading to true when submission starts
    setShowLoader(true); // Show loader immediately

    try {
      await axios.post('/projects', values);
      console.log('Project saved successfully');
      onProjectAdded(); // Call the passed function to update projects list
      navigate('/');
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setLoading(false); // Reset loading to false after submission completes
      setShowLoader(false); // Hide loader immediately
    }
  };

  const renderTextField = (name: keyof ProjectFormValues, label: string, type: string = 'text', minDate?: string) => (
    <Field name={name}>
      {({ input, meta }: any) => (
        <Grid item xs={6} key={name}>
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

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  return (
    <Box sx={{ padding: 2 }}>
      <Tooltip title="Go Back" TransitionComponent={Zoom} arrow>
        <IconButton onClick={() => navigate('/')} color="secondary" sx={{ '&:hover svg': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}>
          <ArrowBackIcon sx={{ color: 'rgba(4, 36, 106, 1)' }} />
        </IconButton>
      </Tooltip>
      
      <Form
        validate={validateProjectForm}
        onSubmit={onSubmit}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {renderTextField('project_name', 'Project Name')}
              {renderTextField('code', 'Code')}
              <Grid item xs={12}>
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

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: 'rgba(4, 36, 106, 1)'}}>Submit</Button>
              </Grid>
              
              {showLoader && <LinearIndeterminate />}
            </Grid>
          </form>
        )}
      />
    </Box>
  );
};

export default NewProjectForm;