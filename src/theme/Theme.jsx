import { createTheme } from '@mui/material';
import React, { useEffect } from 'react';
import _ from 'lodash';
import { LightThemeColors } from './LightThemeColors';
import * as locales from '@mui/material/locale';
import { DarkThemeColors } from './DarkThemeColors';
import { useSelector } from 'react-redux';
import { baseDarkTheme, baselightTheme } from './DefaultColors';
import { darkshadows, shadows } from './Shadows';
import CustomTypography from './CustomTypography';
import components from './Components';

/**
 * Builds a theme based on the provided configuration and the current state.
 * 
 * @param {Object} [config={}] - Configuration options for the theme.
 * @param {string} [config.theme] - Name of the theme to use.
 * @param {string} [config.direction] - Text direction for the theme ('ltr' or 'rtl').
 * @returns {Object} - The MUI theme object.
 */
export const BuildTheme = (config = {}) => {
    const themeOptions = LightThemeColors.find((theme) => theme.name === config.theme);
    const darkthemeOptions = DarkThemeColors.find((theme) => theme.name === config.theme);
    const themeReducer = useSelector((state) => state.themeReducer);
    const defaultTheme = themeReducer.activeMode === 'dark' ? baseDarkTheme : baselightTheme;
    const defaultShadow = themeReducer.activeMode === 'dark' ? darkshadows : shadows;
    const themeSelect = themeReducer.activeMode === 'dark' ? darkthemeOptions : themeOptions;

    const baseMode = {
        palette: {
            mode: themeReducer.activeMode,
        },
        shape: {
            borderRadius: themeReducer.borderRadius,
        },
        shadows: defaultShadow,
        typography: CustomTypography,
    };

    const theme = createTheme(
        _.merge({}, baseMode, defaultTheme, locales[themeReducer.isLanguage], themeSelect, {
            direction: config.direction,
        }),
    );

    theme.components = components(theme);

    return theme;
};

/**
 * Hook that returns the current theme object based on the Redux store state.
 * 
 * @returns {Object} - The MUI theme object.
 */
const Theme = () => {
    const activDir = useSelector((state) => state.themeReducer.activeDir);
    const activeTheme = useSelector((state) => state.themeReducer.activeTheme);
    const theme = BuildTheme({
        direction: activDir,
        theme: activeTheme,
    });

    useEffect(() => {
        document.dir = activDir;
    }, [activDir]);

    return theme;
};

export default Theme;
