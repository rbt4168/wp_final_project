"use client"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { main_theme } from '../lib/themes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
export default function NavigationBar(props: any) {
  const [ isLogin, setIsLogin ] = useState(false);

  useEffect(()=>{
    if(!isLogin) {
      axios.get("/api/getNowUser").then(()=>{
        setIsLogin(true);
      }).catch(()=>{setIsLogin(false)});
    }
  }, [])

  return(
    <ThemeProvider theme={main_theme}>
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography component="a" href='/' variant="h4" color="inherit" noWrap sx={{ flexGrow: 1, fontWeight: 700 }}>
            WP Creation
          </Typography>
          
          <nav>
            <Link
                variant="button"
                color="text.primary"
                href="/profile"
                sx={{ my: 1, mx: 1.5 }}
            >
                Profile
            </Link>
            <Link
                variant="button"
                color="text.primary"
                href="/search"
                sx={{ my: 1, mx: 1.5 }}
            >
                SEARCH
            </Link>
            <Link
                variant="button"
                color="text.primary"
                href="/buy_coin"
                sx={{ my: 1, mx: 1.5 }}
            >
                Support
            </Link>
          </nav>
          { isLogin ? (
            <Button component="a" onClick={()=>{
              signOut()
            }} color="secondary" variant="contained" sx={{ my: 1, mx: 1.5 }}>
              Logout
            </Button>
          ) : (
            <Button component="a" href="/login" color="secondary" variant="contained" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          )}
          
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}