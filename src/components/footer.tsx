"use client"
import Container from '@mui/material/Container';
import Copyright from './copyright';
import { main_theme } from '../lib/themes';
import { ThemeProvider } from '@mui/material';

export default function FooterComponent() {
  return (
    <ThemeProvider theme={main_theme}>
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 4,
          py: [3, 6],
        }}
      >
        <Copyright sx={{ mt: 0 }} />
      </Container>
    </ThemeProvider>
  );
}