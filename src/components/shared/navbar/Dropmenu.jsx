import { Box, Button, IconButton, Menu, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Scrollbar from '../../uiComponents/Scrollbar';
import LightAndDarkToggle from '../../uiComponents/LightAndDarkToggle';
import { useFrappeAuth } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';

/**
 * Dropmenu component that displays a profile menu with a logout button.
 * 
 * @returns {JSX.Element} The rendered Dropmenu component.
 */
export default function Dropmenu() {
    const [anchorEl2, setAnchorEl2] = useState(null);
    const navigate = useNavigate();

    const {
        currentUser,
        isValidating,
        isLoading,
        login,
        logout,
        error,
        updateCurrentUser,
        getUserCookie,
    } = useFrappeAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    /**
     * Handles the click event to open the menu.
     * 
     * @param {React.MouseEvent<HTMLElement>} event - The click event.
     */
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    /** Closes the menu by setting the anchor element to null. */
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    return (
        <>
            {/* IconButton to open the profile menu */}
            <IconButton onClick={handleClick2}>
                <PersonOutlineOutlinedIcon color="action" sx={{ height: '2rem', width: '2rem' }} />
            </IconButton>

            {/* Menu component displaying the profile options */}
            <Menu
                id="msgs-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                sx={{
                    '& .MuiMenu-paper': {
                        width: '340px',
                    },
                }}
            >
                {/* Scrollbar component for scrolling content within the menu */}
                <Scrollbar sx={{ height: '100%', maxHeight: '85vh' }}>
                    <Box p={3}>
                        {/* Menu title */}
                        <Typography mb={2} variant="h5">Profile</Typography>

                        {/* Light and dark mode */}
                        <Stack mb={2} justifyContent='center' alignItems='center'>
                            <LightAndDarkToggle />
                        </Stack>

                        {/* Logout button */}
                        <Button
                            // onClick={handleLogout}
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                </Scrollbar>
            </Menu>
        </>
    );
}
