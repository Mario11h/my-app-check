import React, { useState, useRef } from 'react';
import { IconButton, Box, Typography, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import { Transition } from 'react-transition-group';
import { Snackbar } from '@mui/base/Snackbar';
import { styled } from '@mui/system';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  projectName?: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, projectName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputPage, setInputPage] = useState(currentPage);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [exited, setExited] = useState(true);
  const nodeRef = useRef(null);

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      setOpenSnackbar(true);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      setOpenSnackbar(true);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? '' : Number(event.target.value);
    setInputPage(value as number);
  };

  const handleInputBlur = () => {
    if (inputPage >= 1 && inputPage <= totalPages) {
      onPageChange(inputPage);
      setOpenSnackbar(true);
    } else {
      setInputPage(currentPage);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputPage >= 1 && inputPage <= totalPages) {
      onPageChange(inputPage);
      setIsEditing(false);
      setOpenSnackbar(true);
    }
  };

  const handlePageClick = () => {
    setIsEditing(true);
    setInputPage(currentPage);
  };

  const handlePageNumberClick = (page: number) => {
    onPageChange(page);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (_: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  const range = 1;  
  let start = Math.max(1, currentPage - range);
  let end = Math.min(totalPages, currentPage + range);

  if (currentPage - range > 1) {
    start = Math.max(1, currentPage - range);
    end = Math.min(totalPages, start + 2 * range);
  }
  if (currentPage + range < totalPages) {
    end = Math.min(totalPages, currentPage + range);
    start = Math.max(1, end - 2 * range);
  }

  const indicators = (
    <Box display="flex" alignItems="center" justifyContent="center" mx={2}>
      {start > 1 }
      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(page => (
        <Box
          key={page}
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: page === currentPage ?  'rgba(4, 36, 106, 1)' : 'grey.400',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            mx: 0.5,
            color: 'white'
          }}
          onClick={() => handlePageNumberClick(page)}
        >
          {page}
        </Box>
      ))}
      {end < totalPages}
    </Box>
  );

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
      <Box>
        {isEditing ? (
          <TextField
            value={inputPage}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            size="small"
            sx={{ width: 50 }}
          />
        ) : (
          <Typography variant="h6" sx={{ cursor: 'pointer', marginLeft: '-38rem' }} onClick={handlePageClick}>
            Page {currentPage} of {totalPages}
          </Typography>
        )}
      </Box>

      <IconButton onClick={handlePrevious} disabled={currentPage === 1}>
        <ArrowBackIcon />
      </IconButton>

      {indicators}

      <IconButton onClick={handleNext} disabled={currentPage === totalPages}>
        <ArrowForwardIcon />
      </IconButton>

      <StyledSnackbar
        autoHideDuration={5000}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        exited={exited}
      >
        <Transition
          timeout={{ enter: 400, exit: 400 }}
          in={openSnackbar}
          appear
          unmountOnExit
          onEnter={handleOnEnter}
          onExited={handleOnExited}
          nodeRef={nodeRef}
        >
          {(status) => (
            <SnackbarContent
              style={{
                transform: positioningStyles[status],
                transition: 'transform 300ms ease',
              }}
              ref={nodeRef}
            >
              <div className="snackbar-title">Project Name: {projectName}</div>
              <CloseIcon onClick={handleCloseSnackbar} className="snackbar-close-icon" />
            </SnackbarContent>
          )}
        </Transition>
      </StyledSnackbar>
    </Box>
  );
};

const blue = {
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledSnackbar = styled(Snackbar)`
  position: fixed;
  z-index: 5500;
  display: flex;
  bottom: 16px;
  right: 16px;
`;

const SnackbarContent = styled('div')(
  ({ theme }) => `
  position: relative;
  overflow: hidden;
  z-index: 5500;
  display: flex;
  left: auto;
  justify-content: space-between;
  max-width: 560px;
  min-width: 300px;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? '0 2px 8px rgb(0 0 0 / 0.5)'
      : '0 2px 8px ' + grey[200]
  };
  padding: 0.75rem;
  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  font-family: 'IBM Plex Sans', roboto;
  font-weight: 600;

  & .snackbar-title {
    margin-right: 0.5rem;
  }

  & .snackbar-close-icon {
    cursor: pointer;
    font-size: 10px;
    width: 1.25rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
);

const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(500px)',
  exited: 'translateX(500px)',
  unmounted: 'translateX(500px)',
};

export default Pagination;
