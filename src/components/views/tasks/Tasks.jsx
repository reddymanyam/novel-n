import React, { useEffect, useState } from 'react';
import Navbar from '../../shared/navbar/Navbar';
import { Box, Stack, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { CustomTabPanel, a11yProps } from '../../uiComponents/CustomTabPanel';
// import { tasksData } from '../../../dummyData/MockData';
import PageContainer from '../../shared/pageContainer/PageContainer';
import TasksCards from './TasksCards';
import { useDispatch, useSelector } from 'react-redux';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { setStageName } from '../../../store/slices/ProjectSlice';

/**
 * A functional component that renders a task management interface with tabs.
 *
 * This component displays a set of tabs based on the `team` value.
 * The tabs are conditionally appended depending on whether the `team` is 'Acquisition'.
 * Each tab contains a corresponding `TasksCards` component which displays task details.
 *
 * @component
 * @example
 * return (
 *   <Tasks />
 * );
 */
export default function Tasks() {
    const [value, setValue] = useState(0);
    const projectReducer = useSelector((state) => state.projectReducer);
    const dispatch = useDispatch();


    // Team identifier, can be used to determine tab contents.
    const team = "Acquisition";

    // Default tabs that are always present.
    const defaultTabs = ["Pre Proposal", "Option Period", "Closing Period"];

    // Additional tabs that are added based on the team value.
    const additionalTabs = team !== 'Acquisition'
        ? ['Pre Construction', 'Construction', 'Marketing']
        : [];

    // Combined list of tabs to display.
    const tabsList = [...defaultTabs, ...additionalTabs];

    // Map to keep track of tab names by index.
    const tabNameMap = tabsList.reduce((acc, tab, index) => {
        acc[index] = tab;
        return acc;
    }, {});

    /**
     * Fetching Task Data
     */
    const { data: tasksData } = useFrappeGetDocList('Task', {
        fields: ['*'],
        filters: [['team', '=', projectReducer.teamName], ['project', '=', projectReducer.projectName], ['stages', '=', projectReducer.stageName]]
    })

    /**
     * Handles the change of selected tab.
     *
     * @param {React.SyntheticEvent} event - The event triggered by the tab change.
     * @param {number} newValue - The new index of the selected tab.
     */
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        const selectedTabName = tabNameMap[newValue];
        dispatch(setStageName(selectedTabName));
        console.log("Selected Tab Name: ", selectedTabName);
    };

    return (
        <PageContainer title="Tasks" description="Task page">
            <Box m={2}>
                <Navbar title={projectReducer.teamName} />

                <Box my={1}>
                    <Stack sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                                {
                                    tabsList.map((tabName, index) => (
                                        <Tab
                                            label={<Typography variant='p'>{tabName}</Typography>}
                                            {...a11yProps({ index })}
                                            key={tabName}
                                        />
                                    ))
                                }
                            </Tabs>
                        </Box>
                        {
                            tabsList.map((tab, index) => (
                                <CustomTabPanel value={value} index={index} key={tab}>
                                    {tasksData && <TasksCards tasksData={tasksData} projectName={projectReducer.projectName} />}
                                </CustomTabPanel>
                            ))
                        }
                    </Stack>
                </Box>
            </Box>
        </PageContainer>
    );
}
