import * as Yup from 'yup';
import { SetupFormValues } from './Type';

// Define the validation schema
export const EditValidationSchema = Yup.object({
  project_name: Yup.string().required('Project Name is required'),
  code: Yup.string().required('Code is required'),
  overview: Yup.string().required('Overview is required'),
  project_scope: Yup.string().required('Project Scope is required'),
  project_goals_1: Yup.string().required('Project goals 1 is required'),
  project_goals_2: Yup.string().required('Project goals 2 is required'),
  exec_sponsor: Yup.string().required('Exec sponsor is required'),
  business_product: Yup.string().required('Business Product is required'),
  process_owner: Yup.string().required('Process owner is required'),
  pm: Yup.string().required('Project Manager is required'),
  dev: Yup.string().required('Developer is required'),
  risk: Yup.string().required('Risk is required'),
  budget_actual_usd: Yup.number().min(0, 'Budget Actual must be a positive number'),
  budget_planned_usd: Yup.number().min(0, 'Budget Planned must be a positive number'),
  milestones0: Yup.string(),
  milestones1: Yup.string(),
  milestones2: Yup.string(),
  milestones3: Yup.string(),
  milestones4: Yup.string(),
  milestones5: Yup.string(),
});

// List of required fields
const requiredFields: Array<keyof SetupFormValues> = [
  'project_name',
  'code',
  'overview',
  'project_scope',
  'project_goals_1',
  'project_goals_2',
  'exec_sponsor',
  'business_product',
  'process_owner',
  'pm',
  'dev',
  'risk'
];

// Function to determine if a field is required
export const isFieldRequired = (fieldName: keyof SetupFormValues): boolean => {
  return requiredFields.includes(fieldName);
};

export const validateProjectForm = async (values: Partial<SetupFormValues>): Promise<Record<string, string>> => {
  try {
    await EditValidationSchema.validate(values, { abortEarly: false });
    return {};
  } catch (err: unknown) {
    if (err instanceof Yup.ValidationError) {
      const errors: Record<string, string> = {};
      err.inner.forEach((error) => {
        if (error.path) {
          errors[error.path] = error.message;
        }
      });
      return errors;
    } else {
      throw err;
    }
  }
};
