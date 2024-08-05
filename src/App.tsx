import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { fetchProjects } from './features/projectsSlices';
import Pagination from './Components/Pagination';
import { styled } from '@mui/material/styles';
import { Box, Grid, CircularProgress, Tooltip, Zoom, IconButton } from '@mui/material';
import Title from './Components/Title/Titles';
import BasicTimeline from './Components/Milestones/Milestones';
import { useReactToPrint } from 'react-to-print';
import { MilestonesTitle, StatusLabel } from './Components/Title/TitlesStyles';
import { StyledFullWidthGrayBox } from './Components/Box/BoxStyles';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddchartIcon from '@mui/icons-material/Addchart';
import EditIcon from '@mui/icons-material/Edit';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NewProjectForm from './Components/NewProjectForm/NewProjectForm';
import MultipleSelectCheckmarks from './Components/MultipleSelectCheckmarks';
import axios from 'axios';
import Edit from './Components/Edit/EditForm';

const Item = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface Project {
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
  risk?: string;
  budget_actual_usd?: number;
  budget_planned_usd?: number;
  milestones0?: string;
  milestones1?: string;
  milestones2?: string;
  milestones3?: string;
  milestones4?: string;
  milestones5?: string;
  milestonesDates?: string[];
}

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading, error } = useSelector((state: RootState) => state.projects);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const fetchProjectsData = () => {
    dispatch(fetchProjects());
  };

  useEffect(() => {
    fetchProjectsData();
  }, [dispatch]);

  useEffect(() => {
    console.log('projects array:', projects);

    if (projects.length > 0) {
      setTotalPages(projects.length);
      setCurrentProject(projects[currentPage - 1] as Project | null);
    }
  }, [projects, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Page changed to:', page);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'All Project Details',
    onBeforePrint: () => {
      dispatch(fetchProjects());
    }
  });

  const handleDelete = async (projectName: string) => {
    try {
      await axios.delete('/projects', { data: { projectName } });
      console.log(`Deleted project with name ${projectName}`);
      fetchProjectsData();
    } catch (error) {
      console.error(`Error deleting project with name ${projectName}:`, error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getMilestones = (project: Project) => {
    const milestones = [
      (project.milestones0) ? project.milestones0 : '',
      (project.milestones1) ? project.milestones1 : '',
      (project.milestones2) ? project.milestones2 : '',
      (project.milestones3) ? project.milestones3 : '',
      (project.milestones4) ? project.milestones4 : '',
      (project.milestones5) ? project.milestones5 : '',
    ].flat();
    return milestones;
  };

  return (
    <Router>
      <Box sx={{ padding: 2 }}>
        <Routes>
          <Route path="/new-project" element={<NewProjectForm onProjectAdded={fetchProjectsData} />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/" element={
            <>
              <div style={{ display: 'none' }}>
                <div ref={componentRef}>
                  {projects.map((project , index) => (
                    <div key={index} style={{ pageBreakAfter: 'always' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <Box sx={{ flex: 1 }}>
                            <Title
                              project_name={project.project_name}
                              code={project.code}
                              overview={project.overview ?? ''}
                              project_scope={project.project_scope ?? ''}
                              project_goals_1={project.project_goals_1 ?? ''}
                              project_goals_2={project.project_goals_2 ?? ''}
                              exec_sponsor={project.exec_sponsor ?? ''}
                              business_product={project.business_product ?? ''}
                              process_owner={project.process_owner ?? ''}
                              pm={project.pm ?? ''}
                              dev={project.dev ?? ''}
                              risk={project.risk ?? ''}
                              budget_actual_usd={project.budget_actual_usd}
                              budget_planned_usd={project.budget_planned_usd}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <Item sx={{ flex: 1 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <StatusLabel isFinished={!!project.milestones5?.length}>
                                  {!!project.milestones5?.length ? 'FINISHED' : 'ONGOING'}
                                </StatusLabel>
                              </div>
                              <StyledFullWidthGrayBox>
                                <MilestonesTitle>MILESTONES</MilestonesTitle>
                                <BasicTimeline 
                                  milestones={getMilestones(project)} 
                                  isFinished={!!project.milestones5?.length}
                                  currentProject={currentProject ?? {} as Project}
                                />
                              </StyledFullWidthGrayBox>
                            </div>
                          </Item>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                </div>
              </div>

              <Grid container spacing={2}>
                <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box sx={{ flex: 1 }}>
                    <Title
                      project_name={currentProject?.project_name ?? ''}
                      code={currentProject?.code ?? ''}
                      overview={currentProject?.overview ?? ''}
                      project_scope={currentProject?.project_scope ?? ''}
                      project_goals_1={currentProject?.project_goals_1 ?? ''}
                      project_goals_2={currentProject?.project_goals_2 ?? ''}
                      exec_sponsor={currentProject?.exec_sponsor ?? ''}
                      business_product={currentProject?.business_product ?? ''}
                      process_owner={currentProject?.process_owner ?? ''}
                      pm={currentProject?.pm ?? ''}
                      dev={currentProject?.dev ?? ''}
                      risk={currentProject?.risk ?? ''}
                      budget_actual_usd={currentProject?.budget_actual_usd ?? 0}
                      budget_planned_usd={currentProject?.budget_planned_usd ?? 0}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Item sx={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <StatusLabel isFinished={!!currentProject?.milestones5?.length}>
                          {!!currentProject?.milestones5?.length ? 'FINISHED' : 'ONGOING'}
                        </StatusLabel>
                      </div>
                      <StyledFullWidthGrayBox>
                        <MilestonesTitle>MILESTONES</MilestonesTitle>
                        <BasicTimeline 
                          milestones={getMilestones(currentProject ?? {} as Project)} 
                          isFinished={!!currentProject?.milestones5?.length}
                          currentProject={currentProject ?? {} as Project}
                        />
                      </StyledFullWidthGrayBox>
                    </div>
                  </Item>
                </Grid>
              </Grid>

              <Box mt={2} justifyContent="space-between" alignItems="center">
                <div style={{ display: 'flex' }}>
                  <Tooltip title="Add Project" TransitionComponent={Zoom} arrow>
                    <IconButton
                      color="primary"
                      component={Link}
                      to="/new-project"
                      sx={{ '&:hover svg': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}
                    >
                      <AddchartIcon sx={{ color: 'rgba(4, 36, 106, 1)' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Project" TransitionComponent={Zoom} arrow>
                    <IconButton
                      color="primary"
                      component={Link}
                      to="/edit"
                      sx={{ '&:hover svg': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}
                    >
                      <EditIcon sx={{ color: 'rgba(4, 36, 106, 1)' }} />
                    </IconButton>
                  </Tooltip>
                  
                  <MultipleSelectCheckmarks handleDelete={handleDelete}  />

                  <Tooltip title="Print as PDF" TransitionComponent={Zoom} arrow>
                    <IconButton
                      onClick={handlePrint}
                      sx={{ '&:hover svg': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }}
                    >
                      <PictureAsPdfIcon sx={{ color: 'rgba(4, 36, 106, 1)' }} />
                    </IconButton>
                  </Tooltip>
                </div>
                
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange} 
                  projectName={currentProject?.project_name ?? ''}  
                />
              </Box>
            </>
          } />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
