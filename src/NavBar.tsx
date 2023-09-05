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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const appName = "My App"
const navBarHeight = 50

const navBarStyle = {
    customizeToolbar: {
        minHeight: navBarHeight,
    }
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
        top: ref.current.offsetTop - (navBarStyle.customizeToolbar.minHeight * 1.2),
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
    <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
      <List>
        {menuItems.map((menuItem) => (
          <ListItemButton key={menuItem.text} onClick={() => scrollToRef(menuItem.ref)}>
            {menuItem.text}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar style={navBarStyle.customizeToolbar}>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
                {appName}
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
      <div style={{ height: navBarStyle.customizeToolbar.minHeight * 0.55 }}></div> 
    </>
  );
};
