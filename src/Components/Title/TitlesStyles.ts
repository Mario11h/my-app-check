import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const ProjectName = styled(Typography)({
    fontFamily: 'roboto',
    fontWeight: 'bold',
    fontSize: '30px',
    color: 'rgba(4, 36, 106, 1)',
});

export const Code = styled(Typography)({
    fontFamily: 'roboto',
    fontWeight: 'bold',
    fontSize: '16px',
    color: 'gray',
});

export const OverviewTitle = styled(Typography)({
    fontFamily: 'roboto',
    fontWeight: 'bold',
    fontSize: '18px',
    color: 'rgba(4, 36, 106, 1)', // Darker blue 50%
});

export const ProjectScopeTitle = styled('div')({
    display: 'inline-block',
    fontFamily: 'roboto',
    fontWeight: 'bold',
    fontSize: '18px',
    color: 'rgba(4, 36, 106, 1)', // Darker blue 50%
    backgroundColor: '#f0f0f0', // Light gray background color
    padding: '5px 10px', // Adjust padding as needed
    marginBottom: '10px',
});

export const ProjectGoalsTitle = styled('div')({
    display: 'inline-block',
    fontFamily: 'roboto',
    fontWeight: 'bold',
    fontSize: '18px',
    color: 'rgba(4, 36, 106, 1)', // Darker blue 50%
    backgroundColor: '#f0f0f0', // Light gray background color
    padding: '10px', // Adjust padding as needed
    marginBottom: '10px',
    
});

export const Separator = styled('div')({
    backgroundColor: "#5c5a5a",
    width: "1px",
    height: "80px",
    borderRadius: "5px"
    
});

export const StyledProjectDiv = styled('div')({
    display: "flex",
    flexDirection: "column",
    width: 'calc(47% - 1px)', // Adjust width to account for the separator and left margin
    marginLeft: '3%',
});

export const StyledTitleIconDiv = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
     
});

export const StyledUl = styled('ul')({
    textAlign: 'left',
    paddingLeft: '25px', // Add padding to move it away from the edge, adjust as needed
    margin: 0,
    paddingTop: '25px',
  });

export const StatusLabel = styled('div')<{ isFinished: boolean }>(({ isFinished }) => ({
    backgroundColor: isFinished ? 'rgba(0, 179, 136, 1)' : 'rgba(226, 1, 1, 1)',
    color: '#fff',
    padding: '4px 10px',  
    marginTop: '16px',
    display: 'inline-block', 
    fontSize: '18px',
  }));
  
  
  export const MilestonesTitle = styled('div')({
    
    fontFamily: 'roboto',
    fontWeight: 'bold',
    fontSize: '18px',
    color: 'white',  
    backgroundColor: 'rgba(4, 36, 106, 1)', 
    padding: '4px 10px', 
    position: 'absolute',
    top: '16%',
});

 