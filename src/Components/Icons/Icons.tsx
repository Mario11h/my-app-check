// src/Components/Icons/Icons.tsx

import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InsertChartIcon from '@mui/icons-material/InsertChart'; // Example icon import
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export const IconContainer = styled(Box)({
   
});

const Icons: React.FC = () => {
  return (
    <div>
    <IconContainer>
      <TrendingUpIcon color="primary" fontSize="large" />
    </IconContainer>

    <IconContainer>
    <InsertChartIcon color="primary" fontSize="large" />
  </IconContainer>

  <IconContainer>
    <GroupsIcon color="primary" fontSize="large" />
  </IconContainer>
  <IconContainer>
    <GroupsIcon color="primary" fontSize="large" />
  </IconContainer>
  <IconContainer>
    <FlagCircleIcon color="primary" fontSize="large" />
  </IconContainer>
  <IconContainer>
    <ContentPasteSearchIcon color="primary" fontSize="large" />
  </IconContainer>
  <IconContainer>
    <CurrencyExchangeIcon color="primary" fontSize="large" />
  </IconContainer>
    </div>
  );
};

export default Icons;
