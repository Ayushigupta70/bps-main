import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, fetchUserProfile } from '../features/loginSlice';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/BoxMan.svg';
import { useLocation } from 'react-router-dom';
import { FRONTEND_BASE_URL } from "../utils/api";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isExpired = new URLSearchParams(location.search).get("expired") === "true";

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ emailId: '', password: '' });

    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

    const handleTogglePassword = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const loginResponse = await dispatch(loginUser(formData)).unwrap();
            const token = loginResponse.message.token;
            localStorage.setItem("authToken", token);

            const profileResponse = await dispatch(fetchUserProfile(token)).unwrap();
            const role = profileResponse.message?.role;

            console.log('✅ Role received from profile:', role);

            if (typeof role === 'string' && role.length > 0) {
                localStorage.setItem("userRole", role);
            } else {
                console.warn("⚠️ Role is not a valid string.");
            }

            setTimeout(() => {
                window.location.href = `${FRONTEND_BASE_URL}/?token=${token}&role=${role}`;
            }, 100);

        } catch (err) {
            console.error('❌ Login or Profile fetch failed', err);
        }
    };



    return (
        <Box
            sx={{
                background: 'linear-gradient(to right, #4facfe, #00f2fe)',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
            }}
        >
            <Card
                sx={{
                    display: 'flex',
                    width: { xs: '100%', sm: '90%', md: '800px' },
                    height: { xs: 'auto', md: '500px' },
                    borderRadius: 4,
                    boxShadow: 10,
                    overflow: 'hidden',
                }}
            >
                {/* Left - Form */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '50%' },
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h2" fontWeight="bold" gutterBottom align="center">
                        Welcome BPS
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom align="center">
                        Log in to your account
                    </Typography>

                    {isExpired && (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            Your session has expired. Please log in again.
                        </Alert>
                    )}

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {loading && <CircularProgress sx={{ mb: 2, mx: 'auto' }} />}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            name="emailId"
                            fullWidth
                            margin="normal"
                            value={formData.emailId}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            margin="normal"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            sx={{
                                mt: 3,
                                py: 1.5,
                                background: 'linear-gradient(to right, #43e97b, #38f9d7)',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                borderRadius: 2,
                                ':hover': {
                                    background: 'linear-gradient(to right, #38f9d7, #43e97b)',
                                },
                            }}
                        >
                            Log In
                        </Button>
                    </form>
                </Box>

                {/* Right - Image */}
                <Box
                    sx={{
                        width: '50%',
                        background: 'linear-gradient(to bottom, #43e97b, #38f9d7)',
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 3,
                        position: 'relative',
                    }}
                >
                    <Box
                        component="img"
                        src={loginImage}
                        alt="Login Illustration"
                        sx={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            position: 'absolute',
                            top: '40%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontWeight: 'bold',
                            color: '#fff',
                            textAlign: 'center',
                        }}
                    >
                        Bharat Parcel Services
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default Login;
