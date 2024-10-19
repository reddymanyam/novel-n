import { Badge, Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Dropmenu from './Dropmenu';
import { Link } from 'react-router-dom';

/**
 * Navbar component displaying a title and a set of icons with optional badges.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.title - The title to be displayed in the navbar.
 * 
 * @returns {JSX.Element} The rendered Navbar component.
 */
export default function Navbar({ title }) {
    return (
        <Box>
            <Stack flexDirection='row' justifyContent='space-between' alignItems='center' mx={2}>
                {/* Title of the Navbar */}
                <Typography variant="h2" ml={1}>{title.toUpperCase()}</Typography>

                {/* Container for the Navbar icons */}
                <Stack flexDirection='row'>
                    {/* Home icon button */}
                    <Box>
                        <IconButton>
                            <Link to='/home'>
                                <HomeOutlinedIcon color="action" sx={{ height: '2rem', width: '2rem' }} />
                            </Link>
                        </IconButton>
                    </Box>

                    {/* Notifications icon button with badge */}
                    <Box>
                        <IconButton>
                            <Badge badgeContent={4} color="primary">
                                <NotificationsOutlinedIcon color="action" sx={{ height: '2rem', width: '2rem' }} />
                            </Badge>
                        </IconButton>
                    </Box>

                    {/* User profile icon button */}
                    <Box>
                        <Dropmenu />
                    </Box>
                </Stack>
            </Stack>

            {/* Container with gradient border */}
            <Box
                sx={{
                    borderRadius: '4px',
                    border: '1px solid transparent',
                    background: 'linear-gradient(90deg, rgba(26,105,129,1) 0%, rgba(54,172,181,0.6615021008403361) 100%)',
                    padding: '0.15rem',
                }}
            >
                {/* Additional content can be placed here */}
            </Box>
        </Box>
    );
}
