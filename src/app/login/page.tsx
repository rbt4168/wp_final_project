"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

import Copyright from '@/components/copyright';
import { main_theme } from '@/lib/themes';

import { useState } from "react";

// Run: npx shadcn-ui@latest add card
import { publicEnv } from "@/lib/env/public";
import { signIn } from "next-auth/react";


export default function SignInSide() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    // TODO: sign in logic
    signIn("credentials", {
      email,
      password,
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/`,
    });
  };

  return (
    <ThemeProvider theme={main_theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
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
              Sign in
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
                value={email}
                onChange={(e:any) => {
                  setEmail(e.target.value);
                }}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e:any) => {
                  setPassword(e.target.value);
                }}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </Box>
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
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}