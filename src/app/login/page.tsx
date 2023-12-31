"use client"

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { Avatar, Box, Button, Checkbox, CssBaseline,
  FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Copyright from '@/components/copyright';

import { main_theme } from '@/lib/themes';
import { publicEnv } from "@/lib/env/public";

import axios from 'axios';


export default function SignInSide() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ isLogin, setIsLogin ] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
 
  const error_msg = searchParams.get('error')

  const handleSubmit = () => {
    
    signIn("credentials", {
      email,
      password,
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/login`,
    }).then(()=>{
      setIsLogin(true);
      router.push("/");
    }).catch((e)=>console.error(e));
  };

  useEffect(()=>{
    if(!isLogin) {
      axios.get("/api/getNowUser").then(()=>{
        router.push("/");
      }).catch((e)=>console.error(e));
    }
  }, []);

  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid item xs={false} sm={4} md={7}
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
                error={!!error_msg}
                onChange={(e:any) => setEmail(e.target.value)}
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
                error={!!error_msg}
                onChange={(e:any) => setPassword(e.target.value)}
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
            <Copyright />

          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}