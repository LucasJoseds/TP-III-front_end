
"use client";

import React, { useEffect, useState } from "react";

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import { FaRegEye } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CardActions } from "@mui/material";
import { Cliente } from "./interface/Cliente";

export default function Home() {

  const globalStyles = {
    fontFamily: "'Roboto', sans-serif",
  };
  

  const theme = useTheme();
  const router = useRouter();
  const [cliente, setCliente] = useState<Cliente>();


  useEffect(() => {

    (async () => {
      const response = await fetch('http://localhost:5284/api/clientes/cliente', {
        method: 'GET',
        credentials: 'include',
      });
      const content = await response.json();
      setCliente(content);
      console.log(content)
    }
    )();
  }, []);



  return (
    <div style={globalStyles}>
     <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="h4"  className="mb-4" component="div" sx={{ color: '#ef4444'}}>
          Olá, {cliente?.nome}
        </Typography>

        <Typography variant="h6" component="div" sx={{ color: '#00000'}}>
          O que temos para você!
        </Typography>
      </Box>

    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
              component="img"
              sx={{ height: 200 }}
              image="/img/prato_do_dia.png"
              alt="Prato do dia"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  Pratos mais pedidos
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                Descubra os favoritos da casa, pratos que conquistaram o coração dos nossos clientes pela sua qualidade e sabor incomparável.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant={"destructive"} onClick={() => router.push("cardapio/cardapio-list")} className="w-35">
                  Visualizar <FaRegEye className="ml-2" />
                </Button>
              </CardActions>
            </Box>
          </Card>
        </Grid>

        {/* Sobremesas */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
              component="img"
              sx={{ height: 200 }}
              image="/img/sobremesa.jpg"
              alt="Sobremesa"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  Sobremesas
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                Complete sua refeição com nossas sobremesas, uma seleção deliciosa que promete encantar todos os paladares.
                </Typography>
              </CardContent>
              <CardActions >
                <Button variant={"destructive"} onClick={() => router.push("cardapio/cardapio-list")} className="">
                  Visualizar <FaRegEye className="ml-2" />
                </Button>
              </CardActions>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
              component="img"
              sx={{ height: 200 }}
              image="/img/bebida.jpg"
              alt="Bebida"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  Bebidas
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                Descubra nossa seleção de bebidas refrescantes, perfeitas para acompanhar qualquer refeição e saciar a sua sede.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant={"destructive"} onClick={() => router.push("cardapio/cardapio-list")} className="w-35">
                  Visualizar <FaRegEye className="ml-2" />
                </Button>
              </CardActions>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </div>
  );
}
