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
import { useEffect, useState } from 'react';
import HistoryChart from '../components/HistoryChart.jsx';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import { useLoaderData } from 'react-router-dom';

export default function ReportsPage(){
    const data = useLoaderData();   

    const [useraktif, setuseraktif] = useState(0);
	const [usernonaktif, setusernonaktif] = useState(0);
    const [userbanned, setuserbanned] = useState(0);
    const [auctions, setauctions] = useState(0);
    const [active_auctions, setactive_auctions] = useState(0);
    const [ended_auctions, setended_auctions] = useState(0);
    const [trans, settrans] = useState(0);

    const AllAuctions = async () => {
        const result = (await client.get("/allAuction")).data.result;
        console.log(result)
        setactive_auctions(result.filter((auction) => auction.ended === false).length);
        setended_auctions(result.filter((auction) => auction.ended === true).length);
        setauctions(result.length);
    }

    const AllTrans = async () => {
		const result = (await client.get("/allTransactions")).data;
		settrans(result.length);
	};

    const AllUser = async () => {
		const result = (await client.get("/allUser")).data.result;
		setuseraktif(result.filter((user) => user.role == "verified").length);
		setusernonaktif(
			result.filter(
				(user) => user.role == "unverified" 
			).length,
		);
        setuserbanned(
            result.filter(
                (user) => user.role == "banned" 
            ).length,
        );
	};

    useEffect(()=>{
        AllTrans();
        AllUser();
        AllAuctions();
        console.log(active_auctions)
    })

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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={16} md={6} lg={6}>
                        <Paper
                            sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                        >
                            <Title>Users</Title>
                            <PieChart
                                series={[
                                    {
                                        data:[
                                            {
                                                id:0,
                                                label: 'Active',
                                                value: useraktif,
                                            },
                                            {
                                                id:1,
                                                label: 'Unverified',
                                                value: usernonaktif,
                                            },
                                            {
                                                id:2,
                                                label: 'Banned',
                                                value: userbanned,
                                            },
                                        ]
                                    }
                                ]}
                                width={500} // Updated width
                                height={250}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={16} md={6} lg={6}>
                        <Paper
                            sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                        >
                            <Title>Auctions</Title>
                            <PieChart
                                series={[
                                    {
                                        data:[
                                            {
                                                id:0,
                                                label: 'Ongoing',
                                                value: active_auctions,
                                            },
                                            {
                                                id:1,
                                                label: 'Ended',
                                                value: ended_auctions,
                                            },
                                        ]
                                    }
                                ]}
                                width={500} // Updated width
                                height={250}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container mt={2}>
                    <Grid>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} align="center">
                            <Title>Transaction History</Title>
                            <HistoryChart data={data}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>

    )



}