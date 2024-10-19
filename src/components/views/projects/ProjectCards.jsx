import { Box, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setProjectName } from '../../../store/slices/ProjectSlice'
import CustomProgressBar from './CustomProgressBar';
import ProjectImage from '../../../../public/assets/Projects_Image.webp'

export default function ProjectCards({ data }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (name) => {
        dispatch(setProjectName(name));
        navigate('/tasks');
    }

    return (
        <Box>
            <Card sx={{ width: "20rem" }} variant="outlined" onClick={() => { handleClick(data.name) }} key={data.name}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        // Todo:- Uncomment this when all projects have images
                        // image={data.property_image ? `http://10.10.0.33${data.property_image}` : ProjectImage}
                        image={ProjectImage}
                        alt="Image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.name}
                        </Typography>

                        <Stack gap={0.4}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {data.project_name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {`Lot price - $ ${data.lot_price}`}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {`${data.lot_area} acres lot`}
                            </Typography>
                        </Stack>

                        <Stack gap={2} mt={1}>
                            <CustomProgressBar completed={70} />
                            <CustomProgressBar completed={50} />
                            <CustomProgressBar completed={30} />
                            <CustomProgressBar completed={20} />
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    )
}
