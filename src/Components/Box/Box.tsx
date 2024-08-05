import React from 'react';
import { StyledBox, OverviewBox, OverviewContent, IconContainer, TextContainer, StyledFullWidthGrayBox } from './BoxStyles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from '@mui/material';

interface BoxProps {
  children: React.ReactNode;
}

interface GrayBoxProps {
  children: React.ReactNode;
}

const CustomBox: React.FC<BoxProps> = ({ children }) => {
  return (
    <StyledBox>
      {children}
    </StyledBox>
  );
};

export const OverviewBoxComponent: React.FC<BoxProps> = ({ children }) => {
  return (
    <OverviewBox>
      <OverviewContent>
        <IconContainer>
          <TrendingUpIcon />
        </IconContainer>
        <div>{children}</div>
      </OverviewContent>
    </OverviewBox>
  );
};

export const ProjectScopeBoxComponent: React.FC<BoxProps> = ({ children }) => {
  return (
    <OverviewBox>
      <TextContainer>
        {children}
      </TextContainer>
    </OverviewBox>
  );
};

export const CategoriesBoxComponent: React.FC<BoxProps> = ({ children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }}>
        {children}
      </Grid>
    </Box>
  );
};

// New Full Width Gray Box Component
export const FullWidthGrayBox: React.FC<GrayBoxProps> = ({ children }) => {
  return (
    <StyledFullWidthGrayBox>
      {children}
    </StyledFullWidthGrayBox>
  );
};

export default CustomBox;
