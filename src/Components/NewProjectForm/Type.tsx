// Type.tsx
export interface ProjectFormValues {
  project_name: string;
  code: string;
  overview: string;
  project_scope: string;
  project_goals_1: string;
  project_goals_2: string;
  exec_sponsor: string;
  business_product: string;
  process_owner: string;
  pm: string;
  dev: string;
  risk: string;
  budget_actual_usd: number;
  budget_planned_usd: number;
  milestones0: string[];
  milestones1: string[];
  milestones2: string[];
  milestones3: string[];
  milestones4: string[];
  milestones5: string[];
  [key: `milestones${number}`]: string[]; // Index signature for dynamic milestone properties
}
