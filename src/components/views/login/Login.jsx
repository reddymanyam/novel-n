import React, { useState } from 'react';
import { Box, Stack } from '@mui/system';
import { Card, IconButton, InputAdornment, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

//Frappe imports
import { useFrappeAuth } from 'frappe-react-sdk'

//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//For password
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FaRegUserCircle } from "react-icons/fa";

import PageContainer from '../../shared/pageContainer/PageContainer';
import CustomOutlinedInput from '../../uiComponents/CustomOutlinedInput';
import CustomFormLabel from '../../uiComponents/CustomFormLabel';
import CustomTextField from '../../uiComponents/CustomTextField';
import { useTheme } from '@emotion/react';

export default function Login() {

  const theme = useTheme();
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

  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    userEmail: "",
    password: ""
  })

  //Notification
  const notifySuccess = (msg) => toast.success(msg, { toastId: "success" });
  const notifyError = (msg) => toast.error(msg, { toastId: "error" });
  const notifyWarn = (msg) => toast.warn(msg, { toastId: "warn" });
  const handleOpen = () => setOpen(!open);

  //--------------------------------------------------------For Customer Login-----------------------------------------//
  const handleLoginChange = (e) => {
    const name = e.target.id;
    const value = e.target.value.trim();
    setUserData({ ...userData, [name]: value });
  }

  /**
   * Function to login
   * @param {Event} e 
   */
  const handleLogin = (e) => {
    e.preventDefault();
    const { userEmail, password } = userData;

    if (userEmail !== "" && password !== "") {

      login({ username: userEmail, password: password }).then((response) => {
        notifySuccess('Logged in sucessfully');
        // successAudio.current.play();
        // dispatch(setUser(response.full_name));
        console.log("Login User Name = ", response.full_name);
        // dispatch(setUserEmail(userEmail));
        console.log("inside then " + JSON.stringify(response));

        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }).catch((err) => {
        console.log("inside catch " + JSON.stringify(err.message));
        notifyError(err.message);
      })
    } else {
      notifyWarn("Please fill all the details");
      // warnAudio.current.play();
    }
  }

  return (
    <PageContainer title="Login - Novel Office" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'linear-gradient(124deg, rgba(123,250,232,1) 0%, rgba(156,231,204,0.9948354341736695) 48%, rgba(0,212,255,1) 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems={{ xs: 'start', md: 'center', lg: 'center' }}
          >
            <Card elevation={24} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: { xs: '350px', md: '350px', lg: '450px' }, marginTop: { xs: '20%', md: '0px', lg: '0px' } }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <FaRegUserCircle size='4rem' />
              </Box>
              <>
                <Typography fontWeight="700" variant="h3" mb={1}>
                </Typography>

                <form>
                  <Stack>
                    <Box>
                      <CustomFormLabel htmlFor="userEmail">Email</CustomFormLabel>
                      <CustomTextField id="userEmail" variant="outlined" autoComplete="userEmail" placeholder="example@gmail.com" fullWidth onChange={handleLoginChange} />
                    </Box>
                    <Box>
                      <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                      <CustomOutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => { setShowPassword(!showPassword) }}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOffIcon size="20" /> : <VisibilityIcon size="20" />}
                            </IconButton>
                          </InputAdornment>
                        }
                        id="password"
                        onChange={handleLoginChange}
                        placeholder="*******"
                        fullWidth
                      />
                    </Box>
                  </Stack>
                  <Box mt={3}>
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={handleLogin}
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </Box>
                </form>
              </>
            </Card>
          </Grid>
        </Grid>
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
  )
}
