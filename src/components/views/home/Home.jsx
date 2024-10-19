import { Box, Card, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Navbar from '../../shared/navbar/Navbar';
import { TbWorldSearch } from 'react-icons/tb';
import { FaRegEdit, FaClipboardList, FaFileSignature, FaHandHoldingUsd, FaCalculator, FaMoneyCheckAlt, FaChartPie } from 'react-icons/fa';
import { GiCargoCrane, GiPaintBrush } from 'react-icons/gi';
import PageContainer from '../../shared/pageContainer/PageContainer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTeamName } from '../../../store/slices/ProjectSlice';

//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import { useFrappePostCall } from 'frappe-react-sdk';
import { useTheme } from '@emotion/react';

// Initial cards data with icons
const initialCardsData = [
  { name: 'Sourcing', count: 'Loading...', icon: TbWorldSearch, data: {}, active: true },
  { name: 'Screening', count: 'Loading...', icon: AssignmentOutlinedIcon, data: {}, active: true },
  { name: 'Analysis', count: 'Loading...', icon: FaRegEdit, data: {}, active: true },
  { name: 'Construction', count: 'Loading...', icon: GiCargoCrane, active: true },
  { name: 'Design', count: 'Loading...', icon: BrushOutlinedIcon, active: true },
  { name: 'Marketing', count: 'Loading...', icon: ShoppingBasketOutlinedIcon, active: true },
  { name: 'Acquisition', count: 'Loading...', icon: MonetizationOnOutlinedIcon, active: true },
  { name: 'Dashboard', count: '120', icon: DashboardOutlinedIcon, active: true },
  { name: 'Lending', count: '0', icon: LocalAtmOutlinedIcon, active: false },
  { name: 'Legal', count: '0', icon: NoteAltOutlinedIcon, active: false },
  { name: 'Account', count: '0', icon: CalculateOutlinedIcon, active: false },
];

export default function Home() {

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notifyWarn = (msg) => toast.warn(msg, { toastId: "warn" });

  const { call } = useFrappePostCall('novelite_us.novelite_us.api.home_counts.get_all_counts');

  const requested_counts = {
    "Sourcing": null,
    "Screening": null,
    "Analysis": null,
    "Acquisition": null,
  }

  useEffect(() => {
    call({ requested_counts: requested_counts })
      .then((res) => {
        const data = initialCardsData.map((initialCard) => {
          if (res.message[initialCard.name]) {
            initialCard.count = res.message[initialCard.name].total_count;
          } else {
            initialCard.count = -1;
          }
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const handleCardClick = (name, isActive) => {
    let differentRouteComponents = ['Sourcing', 'Screening', 'Analysis', 'Dashboard'];
    if (isActive) {
      if (!differentRouteComponents.includes(name)) {
        dispatch(setTeamName(name));
        navigate('/projects');
      } else {
        notifyWarn("Work is under progress!...")
      }
    }
  }

  return (
    <PageContainer title="Home" description="Home page">
      <Box m={2}>
        <Navbar title='Home' />
        <Stack flexDirection='row' flexWrap="wrap" gap={2} justifyContent='center' mt={2} alignItems='center'>
          {initialCardsData.map((card, index) => (
            <Card
              key={index + card.name}
              sx={{
                width: 220,
                height: 150,
                textAlign: 'center',
                p: 2,
                border: '2px solid #00A9B9',
                cursor: card.active ? 'pointer' : 'not-allowed',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.04)',
                },
              }}
              onClick={() => { handleCardClick(card.name, card.active) }}
            >
              <Stack alignItems="center" mb={2}>
                <card.icon style={{ fontSize: '60px', color: card.active ? '#00A9B9' : '#00b0c047' }} />
              </Stack>
              <Typography variant="h6">{card.name}</Typography>
              <Typography variant="body2">{card.count}</Typography>
            </Card>
          ))}
        </Stack>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme.palette.mode}
        />
      </Box>
    </PageContainer>
  );
}
