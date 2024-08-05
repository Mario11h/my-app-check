import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { Button, Tooltip, Zoom, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface MultipleSelectCheckmarksProps {
  handleDelete: (projectName: string) => Promise<void>;
}

export default function MultipleSelectCheckmarks({ handleDelete }: MultipleSelectCheckmarksProps) {
  const [projectNames, setProjectNames] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [showSelect, setShowSelect] = useState(false);

  useEffect(() => {
    const fetchProjectNames = async () => {
      try {
        const response = await axios.get('/projects');
        const projects = response.data;
        const names = projects.map((project: { project_name: string }) => project.project_name);
        setProjectNames(names);
      } catch (error) {
        console.error('Error fetching project names:', error);
      }
    };

    fetchProjectNames();
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof selectedProjects>) => {
    const {
      target: { value },
    } = event;
    setSelectedProjects(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedProjects.map(projectName => handleDelete(projectName)));
      console.log('Deleted selected projects');
      setSelectedProjects([]);
    } catch (error) {
      console.error('Error deleting projects:', error); 
    }
  };

  return (
    <div>
      <Tooltip title="Delete Projects" TransitionComponent={Zoom} arrow>
        <IconButton onClick={() => setShowSelect(!showSelect)} color="secondary">
          <DeleteIcon sx={{ color: 'rgba(4, 36, 106, 1)', '&:hover': { transform: 'scale(1.2)' }, transition: 'transform 0.3s' }} />
        </IconButton>
      </Tooltip>

      {showSelect && (
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Delete From Projects</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedProjects}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {projectNames.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selectedProjects.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteSelected}
            disabled={selectedProjects.length === 0}
            sx={{
              backgroundColor: 'rgba(226, 1, 1 , 1)',
              '&:hover': {
                backgroundColor: 'rgba(226, 1, 1, 1)',  
                boxShadow: '0 4px 8px rgba(4, 36, 106, 1)',  
            },
            }}
          >
            Delete Selected
          </Button>
        </FormControl>
      )}
    </div>
  );
}
