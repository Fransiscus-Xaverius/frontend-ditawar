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
import Drawer from '@mui/material/Drawer';
import { useLoaderData } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import AppBar from '@mui/material/AppBar';

export default function TransactionsPage() {
    const data = useLoaderData();
    
    // console.log(data);

    const getDate = (dateMili) =>{
        const date = new Date(dateMili);
        return date.toISOString().substring(0, 10);
    }

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
            <Toolbar/>
            <Box>

                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: 950  
                                }}
                            >
                                <Title>Transactions</Title>
                                <Table size="large" sx={{ minWidth: 700 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ 
                                            fontWeight: 'bold', 
                                            }}>Image</TableCell>
                                            <TableCell
                                            sx={{ 
                                                fontWeight: 'bold' 
                                            }}>Transaction ID</TableCell>
                                            <TableCell sx={{ 
                                            fontWeight: 'bold' 
                                            }}>Buyer</TableCell>
                                            <TableCell sx={{ 
                                            fontWeight: 'bold', 
                                            }}>Product Name</TableCell>
                                            <TableCell sx={{ 
                                            fontWeight: 'bold' 
                                            }}>Transaction Date</TableCell>
                                            <TableCell sx={{ 
                                            fontWeight: 'bold' 
                                            }}>Status</TableCell>
                                            <TableCell align="right" sx={{ 
                                            fontWeight: 'bold' 
                                            }}>Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((row) => (
                                            <TableRow key={row._id}>
                                                <TableCell>{<img src={`http://localhost:3000/static/${row.image}`} width={"80%"} height={"auto"} />}</TableCell>
                                                <TableCell>{row._id}</TableCell>
                                                <TableCell>{row.buyer.email}</TableCell>
                                                <TableCell>{row.item}</TableCell>
                                                <TableCell>{getDate(row.date)}</TableCell>
                                                <TableCell>{row.status}</TableCell>
                                                <TableCell align="right">{row.transaction}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

            </Box>
        </Box>
    )
}
