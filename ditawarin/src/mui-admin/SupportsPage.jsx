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
import InfoIcon from '@mui/icons-material/Info';
import { Tab } from '@mui/material';
import Modal from '@mui/material/Modal';

export default function SupportPage() {
    const data = useLoaderData();
    console.log(data);

    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.rating.filter((row) => {
        return (
            row.buyer.nama.toLowerCase().includes(searchTerm.toLowerCase()) || row.seller.nama.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

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
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <React.Fragment>
                            <Title>User Feedback</Title>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </React.Fragment>
                        {filteredData && filteredData.length > 0 &&  
                        <Table size="small">
                            <TableHead>
                            <TableRow>
                                <TableCell>Seller</TableCell>
                                <TableCell>Buyer</TableCell>
                                <TableCell>Message</TableCell>
                                <TableCell>Rating</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {filteredData.map((row, index) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.buyer.nama}</TableCell>
                                    <TableCell>{row.seller.nama}</TableCell>
                                    <TableCell>{row.comment}</TableCell>
                                    <TableCell>
                                        {[...Array(parseInt(row.rating))].map((item) => {
                                            return <span>⭐</span>;
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>}
                    </Paper>
                </Grid>
            </Container>
        </Box>
    );
}