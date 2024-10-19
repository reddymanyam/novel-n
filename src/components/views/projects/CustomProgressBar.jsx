import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { useTheme } from '@emotion/react';

/**
 * CustomProgressBar is a React component that renders a progress bar with customizable colors and sizes.
 * It uses the theme context to adjust the text color based on the theme mode.
 * 
 * @param {number} [completed=0] - The amount of progress completed. Should be between 0 and `maxCompleted`.
 * @param {number} [maxCompleted=100] - The maximum value of progress. Defines the 100% mark.
 * 
 * @returns {JSX.Element} The rendered ProgressBar component.
 */
export default function CustomProgressBar({ completed = 0, maxCompleted = 100 }) {
    const theme = useTheme();

    // Determines text color based on theme mode
    const textColor = theme.palette.mode === 'dark' ? 'black' : 'white';
    // Determines progress bar color based on theme mode
    const progressBarColor = theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main;

    return (
        <ProgressBar
            completed={completed}
            maxCompleted={maxCompleted}
            bgColor={progressBarColor}
            labelColor={textColor}
            baseBgColor='#dfdfdf'
            transitionTimingFunction='ease-out'
            animateOnRender={true}
            borderRadius='4px'
            height='0.9rem'
            labelSize='0.7rem'
        />
    );
}
