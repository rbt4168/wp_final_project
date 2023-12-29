"use client"

import { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, 
  CardHeader, Container, CssBaseline, Grid, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import NavigationBar from '@/components/navbar';
import FooterComponent from '@/components/footer';

import { main_theme } from '@/lib/themes';

import axios from "axios"
import { useRouter } from 'next/navigation';

const tiers = [
  {
    title: '少量 Coin',
    subheader: '',
    price: 10,
    description: [
      '向創作投以小小支持',
      '享有對方的感謝',
      '將你的名字列入支持者名單',
    ],
    buttonText: 'NTD $30',
    buttonVariant: 'outlined',
  },
  {
    title: '一堆 Coin',
    subheader: 'Most popular',
    price: 100,
    description: [
      '更多的 Coin',
      '讓創作者更積極地創作',
      '專屬支持者徽章'
    ],
    buttonText: 'NTD $250',
    buttonVariant: 'outlined',
  },
  {
    title: '好多 Coin',
    price: 300,
    description: [
      '有助於更多、更優質的內容',
      '與創作者和其他支持者交流',
      '專屬支持者徽章'
    ],
    buttonText: 'NTD $700',
    buttonVariant: 'outlined',
  },
];

export default function Pricing(props: any) {
  const [isDisabled, setIsDisabled] = useState(false);
  
  const [ isLogin, setIsLogin ] = useState(false);

  const router = useRouter();

  useEffect(()=>{
    if(!isLogin) {
      axios.get("/api/getNowUser").then(()=>{
        setIsLogin(true);
      }).catch(()=>{router.push("/login")});
    }
  }, []);

  function handleSubmit(amount:number){
    setIsDisabled(true);

    const payload = {
      coins: amount
    };

    axios.post("/api/buy_coin", payload)
      .then(response => {
        alert("儲值成功");
      }).catch((e) => {
        alert("Error occurred while paying");
      }).finally(() => {
        setIsDisabled(false);
      });
  }

  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <NavigationBar />

      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          購買 Coin 點數
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          快購買點數來支持自己喜歡的創作者吧！
        </Typography>
      </Container>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme:any) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.secondary.main
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      {tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      Coins
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant as 'outlined' | 'contained'}
                    onClick={() => handleSubmit(tier.price)}
                    disabled={isDisabled}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <FooterComponent />
    </ThemeProvider>
  );
}
