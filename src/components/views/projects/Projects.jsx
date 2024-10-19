import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../../shared/navbar/Navbar';
import { CustomTabPanel, a11yProps } from '../../uiComponents/CustomTabPanel';
import ProjectCards from './ProjectCards';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { setProjectType, setStageName } from '../../../store/slices/ProjectSlice';

function Projects() {
    const [value, setValue] = useState(0);
    const [selectedTab, setSelectedTab] = useState('Active');
    const dispatch = useDispatch();
    const projectReducer = useSelector((state) => state.projectReducer);

    /**
     * Fetching Project Data
     */
    let { data: projectData } = useFrappeGetDocList('Project', {
        fields: ['project_name', 'name', 'property_image', 'lot_area', 'lot_price'],
        filters: [['is_owned', '=', selectedTab === 'Owned' ? 1 : 0]],
        orderBy: {
            field: 'creation',
            order: 'desc',
        },
    });

    useEffect(() => {
        dispatch(setStageName('Pre Proposal'));

        if (projectReducer.projectType) {
            setSelectedTab(`${projectReducer.projectType}`);
            if(projectReducer.projectType === 'Owned'){
                setValue(1);
            }
        }
    }, [projectData])

    /**
     * Handles the change of selected tab.
     *
     * @param {React.SyntheticEvent} event - The event triggered by the tab change.
     * @param {number} newValue - The new index of the selected tab.
     */
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        const selectedTabName = tabsList[newValue]; // Get the tab name based on the index
        setSelectedTab(selectedTabName);
        dispatch(setProjectType(selectedTabName));
        console.log("Selected Tab Name:", selectedTabName);
    };

    // Default tabs that are always present.
    const tabsList = ["Active", "Owned"];

    return (
        <>
            <Box m={2}>
                <Navbar title='Projects' />

                <Box my={1}>
                    <Stack sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                                {
                                    tabsList.map((tabName, index) => (
                                        <Tab
                                            label={<Typography variant='h6'>{tabName}</Typography>}
                                            {...a11yProps({ index })}
                                            key={tabName}
                                            sx={{
                                                minWidth: { xs: 90, sm: 125, md: 175, lg: 275 }
                                            }}
                                        />
                                    ))
                                }
                            </Tabs>
                        </Box>
                        {
                            tabsList.map((tabName, index) => (
                                <CustomTabPanel value={value} index={index} key={tabName}>
                                    <Stack
                                        flexDirection={'row'}
                                        flexWrap={'wrap'}
                                        sx={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        gap={2}>
                                        {
                                            projectData?.map((singleProj) => (
                                                <ProjectCards data={singleProj} key={singleProj.name} />
                                            ))
                                        }
                                    </Stack>
                                </CustomTabPanel>
                            ))
                        }
                    </Stack>
                </Box>
            </Box>
        </>
    );
}

export default Projects;
