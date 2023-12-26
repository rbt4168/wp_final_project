"use client"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Copyright from './copyright';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { main_theme } from '../lib/themes';
import { ThemeProvider } from '@mui/material';

const footers = [ {
    title: 'Legal',
    description: [''],
  },
];

export default function FooterComponent(props: any) {
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
        {/* <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid> */}
        <Copyright sx={{ mt: 0 }} />
      </Container>
    </ThemeProvider>
  );
}