import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <NavLink to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
    </NavLink>
    <NavLink to="/admin/auctions" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton>
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Auctions" />
        </ListItemButton>
    </NavLink>
    <NavLink to="/admin/users" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
        </ListItemButton>
    </NavLink>
    <NavLink to="/admin/reports" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </ListItemButton>
    </NavLink>
    <NavLink to="/admin/support" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Support" />
        </ListItemButton>
    </NavLink>
    <NavLink to="/logout" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton>
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
        </ListItemButton>
    </NavLink>
  </React.Fragment>
);
