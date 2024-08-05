import React from 'react';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Grid } from '@mui/material';
import { timelineDotStyles, StyledTimelineContent, FinishedIcon, TimelineStyle, StyledTypography } from './MilestonesStyles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

interface MilestonesProps {
  milestones?: string[];
  isFinished: boolean;
  currentProject: {
    milestones0?: string;  
    milestones1?: string;
    milestones2?: string;
    milestones3?: string;
    milestones4?: string;
    milestones5?: string;   
    milestonesDates?: string[];
  };
}

export const BasicTimeline: React.FC<MilestonesProps> = ({ milestones = [], isFinished, currentProject }) => {
  
  const filteredMilestones = milestones.filter(milestone => milestone !== "");
  const lastIndex = filteredMilestones.length - 1;
  const middleMilestones = filteredMilestones.slice(1, lastIndex);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TimelineStyle>
          {/* Project start date */}
          {currentProject.milestones0 && (
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot sx={timelineDotStyles.startDot}>
                  <DirectionsRunIcon />
                </TimelineDot>
                {milestones.length > 1 && <TimelineConnector />}
              </TimelineSeparator>
              <StyledTimelineContent>
                <StyledTypography>
                  {currentProject.milestonesDates?.[0] || 'Project start date'}: {currentProject.milestones0}
                </StyledTypography>
              </StyledTimelineContent>
            </TimelineItem>
          )}

          {/* Middle milestones */}
          {middleMilestones.map((milestone, index) => (
            <TimelineItem key={index + 1}>
              <TimelineSeparator>
                <TimelineDot sx={timelineDotStyles.milestoneDot}>
                  <span>{index + 1}</span>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <StyledTimelineContent>
                <StyledTypography>
                  {`Milestone ${index + 1}: ${milestone}`}
                  {!isFinished && index === middleMilestones.length - 1 && (
                    <ArrowRightAltIcon style={{ transform: 'rotate(180deg)', marginLeft: '8px' }} />
                  )}
                </StyledTypography>
              </StyledTimelineContent>
            </TimelineItem>
          ))}

          {/* Last milestone or project end date */}
          {(filteredMilestones.length > 1 || currentProject.milestones5) && (
            <TimelineItem key={lastIndex + 1}>
              <TimelineSeparator>
                <TimelineDot sx={timelineDotStyles.endDot}>
                  <FinishedIcon animate={!!currentProject.milestones5?.length}>
                    <CheckCircleIcon />
                  </FinishedIcon>
                </TimelineDot>
                {milestones.length > 1 && <TimelineConnector />}
              </TimelineSeparator>
              <StyledTimelineContent>
                <StyledTypography>
                  {currentProject.milestones5 && currentProject.milestones5 !== filteredMilestones[lastIndex]
                    ? `Final Milestone: ${currentProject.milestones5}`
                    : `${currentProject.milestonesDates?.[lastIndex + 1] || 'Project end date'}: ${filteredMilestones[lastIndex]}`}
                </StyledTypography>
              </StyledTimelineContent>
            </TimelineItem>
          )}
        </TimelineStyle>
      </Grid>
    </Grid>
  );
};

export default BasicTimeline;