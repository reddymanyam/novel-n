import React from 'react'
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { setDarkMode, setTheme } from '../../store/slices/ThemeSlice';
import { Stack } from '@mui/system';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';

import Button from '@mui/material/Button';

export default function LightAndDarkToggle() {

    const dispatch = useDispatch();

    const handleThemeChange = (theme) => {
        dispatch(setDarkMode(theme));
        dispatch(setTheme('CYAN_THEME'));
    }

    return (
        <div>
            <Stack direction={'row'} spacing={2} >
                <Box>
                    <Button size="small" variant="outlined" onClick={() => handleThemeChange('light')}> <WbSunnyTwoToneIcon /> &nbsp; Light</Button>
                </Box>
                <Box>
                    <Button size="small" variant="outlined" onClick={() => handleThemeChange('dark')}> <DarkModeTwoToneIcon /> &nbsp; Dark</Button>
                </Box>
            </Stack>
        </div>
    )
}
