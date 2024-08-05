// src/Components/Box/BoxStyles.ts

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// Common styles for boxes
const commonBoxStyles = {
  borderRadius: '8px',
};

export const StyledBox = styled(Box)(({ theme }) => ({
  ...commonBoxStyles,
  padding: '10px',
  [theme.breakpoints.down('sm')]: {
    padding: '5px',
  },
}));

export const OverviewBox = styled(Box)(({ theme }) => ({
  ...commonBoxStyles,
  padding: '7px',
  marginTop: '20px',
  [theme.breakpoints.down('sm')]: {
    padding: '5px',
  },
}));

export const OverviewContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: '#f0f0f0',
  marginRight: 10,
  marginLeft: 30,
  [theme.breakpoints.down('sm')]: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
}));

export const TextContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  [theme.breakpoints.down('sm')]: {
    gap: '4px',
  },
}));

export const IndividualContainer = styled('div')(({ theme }) => ({
  flexDirection: 'column',
  height: '120px',
  backgroundColor: '#d0d0d0',
  padding: '25px',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    height: '100px',
    padding: '15px',
  },
}));

export const CategoriesIconTitleContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: '10px',
  position: 'relative',
});

export const TitleText = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '-15px',
  left: '10%',
  fontFamily: 'roboto',
  fontWeight: 'bold',
  fontSize: '18px',
  color: 'rgba(4, 36, 106, 1)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
}));

export const Budget = styled('div')({
  fontFamily: 'roboto',
  fontWeight: 'bold',
  fontSize: '16px',
  color: 'rgba(4, 36, 106, 1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '10px',
  width: '100%',
});

interface Budget2Props {
  isActual: boolean;
  budget_actual_usd?: number;
  budget_planned_usd?: number;
}

// Function to get background color based on conditions
const getBackgroundColor = (isActual: boolean, budget_actual_usd: number, budget_planned_usd: number) => {
  if (isActual) {
    return budget_actual_usd > budget_planned_usd ? 'rgba(226, 1, 1, 1)' : 'rgba(4, 164, 132, 1)';
  }
  return 'rgba(7, 62, 187, 1)';
};

const getWidth = (isActual: boolean, budget_actual_usd: number, budget_planned_usd: number) => {
  const BASE_BUDGET = 80000;
  const BASE_WIDTH = 75;
  const WIDTH_INCREMENT = 20;

  if (isActual) {
    const difference = budget_actual_usd - BASE_BUDGET;
    const increments = Math.floor(difference / 15000);
    const newWidth = BASE_WIDTH + increments * WIDTH_INCREMENT;

    return `${newWidth}px`;
  } else {
    const difference = budget_planned_usd - BASE_BUDGET;
    const increments = Math.floor(difference / 15000);
    const newWidth = BASE_WIDTH + increments * WIDTH_INCREMENT;

    return `${newWidth}px`;
  }
};

export const BudgetLabel = styled('div')({
  minWidth: '60px',
  textAlign: 'left',
  marginRight: '15px',
});

export const Budget2 = styled('div')<Budget2Props>(({ isActual, budget_actual_usd = 0, budget_planned_usd = 0 }) => ({
  fontFamily: 'roboto',
  fontWeight: 'bold',
  fontSize: '14px',
  color: 'white',
  backgroundColor: getBackgroundColor(isActual, budget_actual_usd, budget_planned_usd),
  padding: '2px 10px',
  borderRadius: '2px',
  minWidth: getWidth(isActual, budget_actual_usd, budget_planned_usd),
}));

export const StyledFullWidthGrayBox = styled(Box)({
  width: '100%',
  height: '580px',
  backgroundColor: '#d3d3d3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '30px',
});
