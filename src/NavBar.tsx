import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import logoPng from "./imgs/Magnitude_Squared_Transparent_256x256.png"
import * as MSqrdColors from './MSqrdColors';

const appName = "M^2"
const navBarHeight = 60

const navBarStyle = {
    toolbar: {
        minHeight: navBarHeight,
        maxHeight: navBarHeight,
    },
}

interface NavBarProps {
    aboutRef:    React.RefObject<HTMLDivElement>;
    servicesRef: React.RefObject<HTMLDivElement>;
    contactRef:  React.RefObject<HTMLDivElement>;
  }

export default function NavBar({ aboutRef, servicesRef, contactRef }: NavBarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const closeDrawer        = () => setDrawerOpen(false);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - (navBarStyle.toolbar.minHeight),
        behavior: 'smooth',
      });
    }
    closeDrawer();
  };

  const menuItems = [
    { text: 'About',    ref: aboutRef },
    { text: 'Services', ref: servicesRef },
    { text: 'Contact',  ref: contactRef },
  ];

  const drawer = (
    <Drawer 
      open={drawerOpen} 
      onClose={handleDrawerToggle} 
      PaperProps={ { style:{ backgroundColor:MSqrdColors.darkBlue, width:"30%" } } }
      anchor="right"
      >
      <List>
        {menuItems.map((menuItem) => (
          <ListItemButton key={menuItem.text} onClick={() => scrollToRef(menuItem.ref)}>
            <ListItemText style={ { color:MSqrdColors.white, textAlign:"center", textTransform:"uppercase" } }>
              {menuItem.text}
            </ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );

  return (
    <>
      {/* <AppBar position="fixed" style={{ background:"transparent", }}> */}
      <AppBar position="fixed" style={{ background:"#000033", }}>
        <Toolbar style={navBarStyle.toolbar}>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
                <img src={logoPng} 
                  alt={appName} 
                  style={{ maxHeight: `${navBarHeight}px`, padding:'0.5rem', flex:0 }} 
                  onClick={() => scrollToRef(menuItems[0].ref)}
                />
            </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <>
              {menuItems.map((menuItem) => (
                <Button color="inherit" key={menuItem.text} onClick={() => scrollToRef(menuItem.ref)}>
                  {menuItem.text}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
      {drawer}
      {/*div to not overlap with first section*/}
      <div style={{ height: navBarStyle.toolbar.minHeight * 0.55 }}></div> 
    </>
  );
};
