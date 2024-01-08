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

export default function AuctionsPage(){
    const data = useLoaderData();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    console.log(data)
    const ended_auctions = data.filter((auction) => auction.ended === true) 
    const ongoing_auctions = data.filter((auction) => auction.ended === false)
    const filteredData = data.filter((row) => {
        return (
            row.item.nama.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    async function StopAuction(params) {
		try {
			await client.put(`/stopAuction?id=${params}`);
		} catch (error) {
			console.log(error);
		}
		window.location.reload(true);
	}

	async function WarningAuction(params) {
        alert('Warned Auction!')
		try {
			await client.post(`/warningAuction?id_user=${params}`);
		} catch (error) {
			console.log(error);
		}
		window.location.reload(true);
	}

    // Get the first item from the data array
    const auctionObject = data[0];

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
                <Grid align="center">
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} align="center">
                        <Title>Auction Statistic</Title>
                        <PieChart
                        series={[
                        {
                            data: [
                            { id: 0, value: ended_auctions.length, label: 'Ended Auctions' },
                            { id: 1, value: ongoing_auctions.length, label: 'Ongoing Auctions' },
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
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <React.Fragment>
                    <Title>Auction List</Title>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                   {filteredData && filteredData.length > 0 &&  
                   <Table size="small">
                        <TableHead>
                        <TableRow>
                            <TableCell>Gambar</TableCell>
                            <TableCell>Nama Barang</TableCell>
                            <TableCell>Nama Penjual</TableCell>
                            <TableCell>Kategori Barang</TableCell>
                            <TableCell>Dikirim Dari</TableCell>
                            <TableCell>Ended</TableCell>
                            <TableCell>Has Bids</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {filteredData.map((row, index) => (
                            <TableRow key={row._id}>
                            <TableCell><img src={import.meta.env.VITE_API_URL + "/static/" +row.item.images} style={{ width: "100px" }} /></TableCell>
                            <TableCell>{row.item.nama}</TableCell>
                            <TableCell>{row.nama_penjual}</TableCell>
                            <TableCell>{row.kategori_barang}</TableCell>
                            <TableCell>{row.kecamatan},{row.kota_kabupaten},{row.provinsi}</TableCell>
                            <TableCell>{row.ended ? "Yes" : "No"}</TableCell>
                            <TableCell>{row.highest_bid ? "Yes" : "No"}</TableCell>
                            <TableCell align='right'>
                                <IconButton aria-label="delete" size="small" onClick={handleOpen}>
                                    <InfoIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="delete" size="small" onClick={
                                    ()=> WarningAuction(row._id)
                                }>
                                    <WarningIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="delete" size="small" onClick={
                                    ()=> StopAuction(row._id)
                                }>
                                    <NotInterestedIcon fontSize="inherit" />
                                </IconButton>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>}
                </React.Fragment>
                </Paper>
              </Grid>
            </Container>
           {auctionObject &&  <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Auction Details
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {/* Display the details of the auction object here */}
                        {/* Replace the placeholders with the actual auction object properties */}
                        <p>Nama Barang: {auctionObject.nama_barang}</p>
                        <p>Nama Penjual: {auctionObject.nama_penjual}</p>
                        <p>Kategori Barang: {auctionObject.kategori_barang}</p>
                        {/* Add more details as needed */}
                    </Typography>
                </Box>
            </Modal>}
        </Box>
    )
}