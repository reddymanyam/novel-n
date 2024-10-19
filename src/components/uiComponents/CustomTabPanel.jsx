import { Box } from "@mui/material";

/**
 * A functional component that renders a tab panel for a tabbed interface.
 *
 * The `CustomTabPanel` component is used to display the content of a specific tab.
 * It only renders its children when the current tab (indicated by `value`) matches the `index`.
 *
 * @param {object} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be displayed in the tab panel.
 * @param {number} props.value - The current selected tab index.
 * @param {number} props.index - The index of the tab panel.
 * @param {object} [props.other] - Any additional props to be passed to the `div` element.
 * 
 * @returns {JSX.Element} The rendered tab panel.
 */
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

/**
 * Generates accessibility properties for a tab.
 *
 * The `a11yProps` function returns accessibility attributes needed for the `Tab` component,
 * including `id` and `aria-controls` attributes.
 *
 * @param {number} index - The index of the tab for which to generate accessibility properties.
 * 
 * @returns {object} An object containing the `id` and `aria-controls` attributes.
 */
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export { a11yProps, CustomTabPanel };
