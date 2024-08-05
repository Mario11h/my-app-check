import React from 'react';
import CustomBox, { OverviewBoxComponent, ProjectScopeBoxComponent, CategoriesBoxComponent } from '../Box/Box';
import OverviewGrid from '../OverviewGrid/OverviewGrid';
import { ProjectName, Code, OverviewTitle, ProjectScopeTitle, Separator, StyledProjectDiv, StyledTitleIconDiv, StyledUl } from './TitlesStyles';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import { StyledProjectIcon, StyledFlagCircle, IconWrapper } from '../Icons/IconsStyles';
import { Budget, Budget2, BudgetLabel, CategoriesIconTitleContainer, IndividualContainer, TitleText } from '../Box/BoxStyles';
import GroupsIcon from '@mui/icons-material/Groups';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface TitleProps {
  project_name: string;
  code: string;
  overview: string;
  project_scope: string;
  project_goals_1: string;
  project_goals_2: string;
  exec_sponsor?: string;
  business_product?: string;
  process_owner?: string;
  pm?: string;
  dev?: string;
  risk?: string;
  budget_actual_usd?: number;
  budget_planned_usd?: number;

}

const Title: React.FC<TitleProps> = ({
  project_name,
  code,
  overview,
  project_scope,
  project_goals_1,
  project_goals_2,
  exec_sponsor,
  business_product,
  process_owner,
  pm,
  dev,
  risk,
  budget_actual_usd,
  budget_planned_usd,
}) => {
  
  return (
    <>
      <CustomBox>
        <ProjectName>{project_name}</ProjectName>
         
        <Code>{code}</Code>
      </CustomBox>

      <OverviewBoxComponent>
        <OverviewTitle>Overview</OverviewTitle>
        <OverviewGrid overview={overview} />
      </OverviewBoxComponent>

      <ProjectScopeBoxComponent>
        <StyledProjectDiv>
          <StyledTitleIconDiv>
            <ProjectScopeTitle>Project Scope</ProjectScopeTitle>
            <StyledProjectIcon>
              <AssessmentIcon />
            </StyledProjectIcon>
          </StyledTitleIconDiv>
          <OverviewGrid overview={project_scope} />
        </StyledProjectDiv>

        <Separator />

        <StyledProjectDiv>
          <StyledTitleIconDiv>
            <ProjectScopeTitle>Project Goals</ProjectScopeTitle>
            <StyledFlagCircle>
              <FlagCircleIcon />
            </StyledFlagCircle>
          </StyledTitleIconDiv>
          <OverviewGrid overview= {project_goals_1} />
          <OverviewGrid overview={project_goals_2} />

        </StyledProjectDiv>
      </ProjectScopeBoxComponent>

      <CategoriesBoxComponent>
        <Grid item xs={6}>
          <Item>
            <IndividualContainer>
              <IconWrapper>
                <GroupsIcon />
              </IconWrapper>
              <CategoriesIconTitleContainer>
                <TitleText>Business Team</TitleText>
              </CategoriesIconTitleContainer>
              <StyledUl>
                <li>Exec, Sponsor: {exec_sponsor}</li>
                <li>Business Product: {business_product}</li>
                <li>Process Owner: {process_owner}</li>
              </StyledUl>
            </IndividualContainer>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <IndividualContainer>
              <IconWrapper>
                <GroupsIcon />
              </IconWrapper>
              <CategoriesIconTitleContainer>
                <TitleText>HUB Team</TitleText>
              </CategoriesIconTitleContainer>
              <StyledUl>
                <li>PM: {pm}</li>
                <li>Dev: {dev}</li>
              </StyledUl>
            </IndividualContainer>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <IndividualContainer>
              <IconWrapper>
                <ContentPasteSearchIcon />
              </IconWrapper>
              <CategoriesIconTitleContainer>
                <TitleText>Risk & Issues</TitleText>
              </CategoriesIconTitleContainer>
              <StyledUl>
                 {risk} 
              </StyledUl>
            </IndividualContainer>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <IndividualContainer>
              <IconWrapper>
                <CurrencyExchangeIcon />
              </IconWrapper>
              <CategoriesIconTitleContainer>
                <TitleText>HUB Project Budget</TitleText>
              </CategoriesIconTitleContainer>
              <ul>
                <Budget>
                  <BudgetLabel>Actual</BudgetLabel> <Budget2 isActual={true} budget_actual_usd={budget_actual_usd} budget_planned_usd={budget_planned_usd}>{budget_actual_usd} USD</Budget2>
                </Budget>
                <br />
                <Budget>
                  <BudgetLabel>Planned</BudgetLabel> <Budget2 isActual={false} budget_actual_usd={budget_actual_usd} budget_planned_usd={budget_planned_usd}>{budget_planned_usd} USD</Budget2>
                  
                </Budget>
              </ul>
            </IndividualContainer>
          </Item>
        </Grid>
      </CategoriesBoxComponent>

    </>
  );
};

export default Title;
