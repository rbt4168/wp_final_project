"use client"
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { main_theme } from '@/lib/themes';

export default function Copyright() {
  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://rbt4168.csie.org/">
          WP Creation
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </ThemeProvider>
  );
}