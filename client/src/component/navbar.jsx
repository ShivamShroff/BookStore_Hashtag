import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Typography, List, ListItem, ListItemText} from '@mui/material';

export default function Navbar() {
  return (
    // the sx prop is used for styling
    <Box sx={{backgroundColor:'#808080', py:0, px:2, boxShadow:'0px 2px 4px rgba(0,0,0,0.2)',
    }}>
    <Box sx={{maxWidth:1200, mx:'auto', display:'flex', justifyContent:'space-between', alignItems:'center',
      }}>
      {/*  adding a typography component for title */}
        <Typography variant="h5" sx={{color:'white', fontWeight:'bold'}}>
          Online Bookstore and Inventory Management (Taghash)
        </Typography>
        {/*  list component to hold links and with similar styling*/}
        <List sx={{display:'flex', justifyContent:'space-between'}}>
          <ListItem sx={{pr:2}}>
            <ListItemText><Link to="/" style={{textDecoration:'none', color:'white'}}> Home </Link></ListItemText>
          </ListItem>

          <ListItem sx={{pr:2}}>
            <ListItemText><Link to="/add-update" style={{textDecoration:'none', color:'white'}}>Admin</Link></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText><Link to="/inventory" style={{textDecoration:'none', color: 'white'}}>Inventory</Link></ListItemText>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
