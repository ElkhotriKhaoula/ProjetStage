import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import photo from "../../assets/Images/WILAYA.jpeg";

const defaultTheme = createTheme();

export default function SignInSide() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        const dataForm = new FormData(e.currentTarget);
        const email = dataForm.get("email");
        const password = dataForm.get('password');
        if (!email) {
            setError("Entrer votre email");
        } else if (!password) {
            setError("Entrer votre mot de passe");
        } else {
            const url = "http://localhost/react/login.php";
            const headers = {
                "Accept": "application/json",
                "Content-type": "application/json"
            };
            const data = {
                email,
                password
            };
            console.log(data);
            fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data)
            }).then((response) => response.json())
                .then((response) => {
                    if (response.user) {
                        localStorage.setItem("login", JSON.stringify(response.user));
                        switch (response.user.role) {
                            case "user":
                                navigate('/DashbordUser');
                                break;
                            case "admin":
                                navigate('/DashbordAdmin');
                        }

                    } else {
                        setError("Email ou mot de passe incorrect");
                        localStorage.clear();
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }

    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${photo})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Se Connecter
                        </Typography>
                        {error === "Email ou mot de passe incorrect" && <small className="text-danger">{error}</small>}
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            {error === "Entrer votre email" && <small className="text-danger">{error}</small>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {error === "Entrer votre mot de passe" && <small className="text-danger">{error}</small>}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Se Connecter
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
