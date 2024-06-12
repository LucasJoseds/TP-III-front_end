"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { IoBagRemoveOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

import { useEffect, useState } from 'react';


const pages = ['Home', 'Meus pedidos'];
const settings = ['Minha conta', 'Sair'];

function ResponsiveAppBar() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const [currentOrder, setCurrentOrder] = useState([]);

  const updateCurrentOrder = () => {
    const storedOrder = JSON.parse(localStorage.getItem("pedido") || "[]");
    setCurrentOrder(storedOrder);
  };

  useEffect(() => {
    updateCurrentOrder();
    
    // Evento personalizado para atualizar o estado quando o carrinho for atualizado
    const handleStorageChange = () => {
     
        updateCurrentOrder();
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup do evento
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

 
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageClick = (page: string) => {
    handleCloseNavMenu();
    if (page === 'Home') {
      router.push('/');
    }

    if (page === 'Cardápio') {
        router.push('/cardapio/cardapio-list');
      }

      if (page === 'Meus pedidos') {
        router.push('/cliente/cliente-orders');
      }
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Button onClick={()=>router.push("/")}>

        <Avatar alt="Remy Sharp" src="/img/name.png"  sx={{ width: 100, borderRadius:0 ,marginRight:10 }} className='cursor-pointer'/>

        </Button>
       

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={()=>handlePageClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
    
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Avatar alt="Remy Sharp" src="/img/restaurante.png" sx={{ width: 110 }}/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>handlePageClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          
            <div onClick={()=>router.push("/pedido/pedido-form")} className='flex items-center cursor-pointer relative mr-10'>
              <IoBagRemoveOutline size={24} />
              <span className='bg-red-500  text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center
              absolute left-3 bottom-3' >{currentOrder.length}</span>
              </div>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <FiUser />
              </IconButton>

            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
