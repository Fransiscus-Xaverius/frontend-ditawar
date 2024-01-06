import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems } from './listItems';
import Chart from './Chart.jsx';
import Deposits from './Deposits';
import Orders from './Orders';
import { Outlet } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';
import client from '../client.jsx';
import { PieChart } from '@mui/x-charts/PieChart';

import { useLoaderData } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

function preventDefault(event) {
    event.preventDefault();
}
  

export default function UsersPage(){
    const data = useLoaderData();

    const banned_users = data.filter((user) => user.role === 'banned');
    const verified_users = data.filter((user) => user.role === 'verified');
    const unverified_users = data.filter((user) => user.role === 'unverified');

    function ActiveAccount(params) {
		try {
			const result = client.put(`/verification?id=${data[params]._id}`);
		} catch (error) {
			console.log(error);
		}
		window.location.reload(true);
	}

	function BanAccount(params) {
		try {
			const result = client.put(`/banned?id=${data[params]._id}`);
		} catch (error) {
			console.log(error);
		}
        window.location.reload(true);
	}

    console.log(data);
    return (
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Title>User Statistics</Title>
                    <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: banned_users.length, label: 'Banned Users' },
                          { id: 1, value: verified_users.length, label: 'Verified Users' },
                          { id: 2, value: unverified_users.length, label: 'Unverified Users' },
                        ],
                      },
                    ]}
                    width={500}
                    height={250}
                  />
              </Paper>
            </Grid>
          </Container>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <React.Fragment>
                    <Title>User List</Title>
                    <Table size="small">
                        <TableHead>
                        <TableRow>
                            <TableCell>Nama</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell >is Verified</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={row._id}>
                            <TableCell>{row.nama}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell>{row.address},{row.city},{row.province}</TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell align='right'>
                                <IconButton aria-label="delete" size="small" >
                                    <EditIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="delete" size="small" >
                                    <WarningIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="delete" size="small" onClick={
                                    ()=> BanAccount(index)
                                }>
                                    <NotInterestedIcon fontSize="inherit" />
                                </IconButton>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </React.Fragment>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
    )
}