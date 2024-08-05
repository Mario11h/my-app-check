 import { styled } from '@mui/system';
import { TimelineContent, Timeline} from '@mui/lab';
import Typography from '@mui/material/Typography';

interface FinishedIconProps {
  animate: boolean;
}

export const timelineDotStyles = {
  startDot: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(4, 36, 106, 1)',
    borderRadius: '50%',
    color: '#fff',
    '& .MuiSvgIcon-root': {
      fontSize: '42px',
    },
  },
  milestoneDot: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    fontFamily: 'roboto',
    fontWeight: 'bold',
    borderRadius: '50%',
    color: 'rgba(4, 36, 106, 1)',
    border: '2px solid #fff',
    '& .MuiSvgIcon-root': {
      fontSize: '12px',
    },
  },
  endDot: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: '50%',
    color: 'rgba(4, 164, 132, 1)',
    '& .MuiSvgIcon-root': {
      fontSize: '45px',
    },
  },
};


export const StyledTimelineContent = styled(TimelineContent)({
  fontFamily: 'roboto',
  fontWeight: 'bold',
  fontSize: '1rem',
  color: 'rgba(4, 36, 106, 1)',
});

export const FinishedIcon = styled('div')<FinishedIconProps>`
  ${({ animate }) =>
    animate &&
    `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-30px);
      }
      60% {
        transform: translateY(-15px);
      }
    }
    animation: bounce 2s infinite;
  `}
  display: flex;
  align-items: center;
  justify-content: center;
`;

 
 
export const TimelineStyle = styled(Timeline)({
  marginLeft: '-380px',
   
});

 

export const StyledTypography = styled(Typography)({
  fontSize: '0.8rem', // Smaller font size
  textAlign: 'left',
  paddingLeft: '10px',
});