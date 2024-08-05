import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const IconContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: '#f0f0f0', // Light gray background color
  marginRight: 10,
  marginLeft: '50%', // Adjust as needed
});

export const StyledProjectIcon = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: 'rgba(4, 164, 132, 1)', 
  color: 'white',  
  transform: 'translateY(-20px)'
})

export const StyledFlagCircle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: 'rgba(4, 36, 106, 1)',
  color: 'white',  
  transform: 'translateY(-20px)'
})

export const IconWrapper = styled('div')({
  position: 'absolute',
  top: '18px',  
  left: '20px',  
  transform: 'scale(1.8)',  
});


