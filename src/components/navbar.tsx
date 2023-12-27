"use client"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { main_theme } from '../lib/themes';
export default function NavigationBar(props: any) {
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
                href="#"
                sx={{ my: 1, mx: 1.5 }}
            >
                Enterprise
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
          <Button href="/login" color="secondary" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}