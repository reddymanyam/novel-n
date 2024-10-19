import { Stack, Typography, IconButton, Chip, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
// import { tasksData as rows } from '../../../dummyData/MockData';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { Link, useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AttachmentModal from './AttachmentModal';
import { useTheme } from '@mui/material/styles';

/**
 * Defines the initial pagination model for the DataGrid.
 * 
 * @type {object}
 */
const paginationModel = { page: 0, pageSize: 10 };

/**
 * A functional component that renders a DataGrid of tasks within a Paper component.
 *
 * The `TasksCards` component displays a DataGrid with task data. The grid is configured with pagination
 * and non-editable cells. Clicking on a cell triggers the `handleClick` function.
 *
 * @param {object} props - The props for the component.
 * @param {Array<object>} props.data - The data to be displayed in the DataGrid. (Currently unused in this example)
 * 
 * @returns {JSX.Element} The rendered component with a DataGrid inside a Paper element.
 */
export default function TasksCards({ tasksData, projectName }) {
    const [open, setOpen] = useState(false);
    const [taskNameForAttachment, setTaskNameForAttachment] = useState('');
    const handleOpen = (name) => { setOpen(true); setTaskNameForAttachment(name) };
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const theme = useTheme();  // Access the theme object here

    /**
     * Defines the columns for the DataGrid.
     * 
     * @type {Array<object>}
     */
    const columns = [
        {
            field: 'name',
            headerName: 'Task ID',
            width: 150,
            headerClassName: 'header',
            cellClassName: 'cell',
        },
        {
            field: 'assign_to_name',
            headerName: 'Assigned To',
            width: 130,
            valueGetter: (value, row) => row.assign_to_name || 'NA',
            headerClassName: 'header',
            cellClassName: 'cell',
        },
        {
            field: 'subject',
            headerName: 'Task Name',
            width: 250,
            headerClassName: 'header',
            cellClassName: 'cell',
        },
        {
            field: 'exp_start_date',
            headerName: 'Start Date',
            width: 130,
            headerClassName: 'header',
            cellClassName: 'cell',
        },
        {
            field: 'exp_end_date',
            headerName: 'End Date',
            width: 130,
            headerClassName: 'header',
            cellClassName: 'cell',
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            headerClassName: 'header',
            renderCell: (params) => {
                const status = params.value;
                let color;

                switch (status) {
                    case 'Completed':
                        color = 'success';
                        break;
                    case 'Overdue':
                        color = 'warning';
                        break;
                    case 'Cancelled':
                        color = 'error';
                        break;
                    default:
                        color = 'default';
                }

                return (
                    <Chip
                        label={status}
                        color={color}
                        sx={{
                            backgroundColor: color === 'success'
                                ? theme.palette.success.light
                                : color === 'warning'
                                    ? theme.palette.warning.light
                                    : color === 'error'
                                        ? theme.palette.error.light
                                        : theme.palette.grey[300],
                            color: theme.palette.getContrastText(color === 'success'
                                ? theme.palette.success.light
                                : color === 'warning'
                                    ? theme.palette.warning.light
                                    : color === 'error'
                                        ? theme.palette.error.light
                                        : theme.palette.grey[300]),
                        }}
                    />
                );
            },
        },
        {
            field: 'Attachment',
            headerName: 'Attach',
            width: 100,
            sortable: false,
            headerClassName: 'header',
            renderCell: (params) => (
                <IconButton
                    color="primary"
                    onClick={() => { handleOpen(params.row.name) }}
                >
                    <AttachFileOutlinedIcon />
                </IconButton>
            ),
        },
        {
            field: 'View',
            headerName: 'View',
            width: 100,
            sortable: false,
            headerClassName: 'header',
            renderCell: (params) => (
                <IconButton
                    color="primary"
                    onClick={() => handleView(params.row.name)}
                >
                    <RemoveRedEyeOutlinedIcon />
                </IconButton>
            ),
        },
    ];

    /**
     * Handles the view icon click event.
     * 
     * @param {object} row - The row data of the clicked icon.
     */
    const handleView = (name) => {
        navigate('/projectsDetails', { state: { name } });
    };

    return (
        <Stack justifyContent='center' alignItems='center' gap={1}>
            <Stack flexDirection='row' justifyContent='space-between' width='100%' mx={8}>
                <Button variant='contained' onClick={() => { navigate(-1) }} >
                    Back
                </Button>
                <Typography variant='h5'>
                    {projectName}
                </Typography>
                <Button variant='contained' component={Link} to='/add-task'>
                    Add Task
                </Button>
            </Stack>
            <Paper sx={{ maxHeight: 500, width: '100%', backgroundColor: 'background.paper' }}>
                <DataGrid
                    rows={tasksData}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10, 15, 20]}
                    getRowId={(row) => row.name}
                    checkboxSelection={false}
                    isRowSelectable={() => false}
                    disableSelectionOnClick
                    sx={{
                        border: 0,
                        '& .header': {
                            fontSize: '1.25rem',
                            backgroundColor: theme.palette.primary
                        },
                        '& .cell': {
                            fontSize: '1rem',
                        },
                    }}
                />
            </Paper>
            {/* To show attachments */}
            <AttachmentModal open={open} handleClose={handleClose} taskNameForAttachment={taskNameForAttachment} />
        </Stack>
    );
}
