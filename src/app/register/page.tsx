"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Avatar, Box, Button, Checkbox, CssBaseline,
  FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Copyright from '@/components/copyright';

import { main_theme } from '@/lib/themes';
import { publicEnv } from "@/lib/env/public";


export default function SignInSide() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setName] = useState<string>("");

  const handleSubmit = () => {
    signIn("credentials", {
      username,
      email,
      password,
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/`,
    });
  };

  return (
    <ThemeProvider theme={main_theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t:any) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{ my: 8, mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e:any) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e:any) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="username"
                label="Username"
                id="username"
                value={username}
                onChange={(e:any) => setName(e.target.value)}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="I agree the user policy."
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Button
                onClick={async () => {
                  signIn("github", {
                    callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/`,
                  });
                }}
                className="flex w-full"
                variant="contained"
              >
                <Box component="img"
                  width={20}
                  height={20}
                  alt="github icon"
                  src="/github.png"
                />
                <Typography className="grow">Sign In with Github</Typography>
              </Button>
              <Button
                onClick={async () => {
                  signIn("google", {
                    callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/`,
                  });
                }}
                className="flex w-full"
                variant="contained"
              >
                <Box component="img"
                  width={20}
                  height={20}
                  alt="google icon"
                  src="/google.jpg"
                />
                <Typography className="grow">Sign In with Google</Typography>
              </Button>
              
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright />
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}