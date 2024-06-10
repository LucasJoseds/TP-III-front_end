
"use client";

import React from "react";

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Grid from "@mui/material/Grid";
import { FaRegEye } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CardActions } from "@mui/material";

export default function Home() {

  const theme = useTheme();
  const router = useRouter();

  return (
    
    <Box sx={{ flexGrow: 1, p: 2 }}>
    <Grid container spacing={4} direction="column">
      {/* Cardápio do Dia */}
      <Grid item xs={12}>
        <Card sx={{ display: 'flex', height: 200, width: '100%' }}>
          <CardMedia
            component="img"
            sx={{ width: 250 }}
            image="/img/prato_do_dia.png"
            alt="Prato do dia"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                Pratos mais pedidos
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Os clientes adoram!
              </Typography>

            </CardContent>
            <CardActions>
              <Button variant={"destructive"} onClick={()=>router.push("cardapio/cardapio-list")} className="w-35">Visualizar <FaRegEye className="ml-2"/></Button>

            </CardActions>
          </Box>
        </Card>
      </Grid>

      {/* Sobremesas */}
      <Grid item xs={12}>
        <Card sx={{ display: 'flex', height: 200, width: '100%' }}>
          <CardMedia
            component="img"
            sx={{ width: 250 }}
            image="/img/sobremesa.jpg"
            alt="Sobremesa"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                Sobremesas
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Delicie-se com nossas opções.
              </Typography>
            </CardContent>

            <CardActions>
              <Button variant={"destructive"} onClick={()=>router.push("cardapio/cardapio-list")} className="w-35">Visualizar <FaRegEye className="ml-2"/></Button>

            </CardActions>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card sx={{ display: 'flex', height: 200, width: '100%' }}>
          <CardMedia
            component="img"
            sx={{ width: 250 }}
            image="/img/bebida.jpg"
            alt="Sobremesa"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                Bebidas
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Delicie-se com nossas opções.
              </Typography>
            </CardContent>

            <CardActions>
              <Button variant={"destructive"} onClick={()=>router.push("cardapio/cardapio-list")} className="w-35">Visualizar <FaRegEye className="ml-2"/></Button>

            </CardActions>

          </Box>
        </Card>
      </Grid>
    </Grid>
  </Box>
   
  );
}
