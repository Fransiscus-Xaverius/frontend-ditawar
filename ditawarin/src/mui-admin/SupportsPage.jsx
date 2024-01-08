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
import Accept from "../assets/accepted.png";
import Help from "../assets/help.png";
import Notification from "../assets/notification.png";

import { useLoaderData } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import InfoIcon from '@mui/icons-material/Info';
import { Tab } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';

export default function SupportPage() {
    const data = useLoaderData();
    console.log(data);
    const [seller, setSeller] = React.useState(null);
    const { register, handleSubmit, reset } = useForm();

    async function sendEmail(email, msg) {
		await client.post("/sendmail?email=" + email, {
			msg: msg,
			subject: "Customer Service",
		});
	}

    const handlePopup = (data) => {
		sendEmail(seller, data.pesan);
        reset()
	};

    const [searchTermRating, setSearchTermRating] = React.useState('');

    const handleSearchRating = (event) => {
        setSearchTermRating(event.target.value);
    };

    const filteredDataRating = data.rating.filter((row) => {
        return (
            row.buyer.nama.toLowerCase().includes(searchTermRating.toLowerCase()) || row.seller.nama.toLowerCase().includes(searchTermRating.toLowerCase())
        );
    });

    const [searchTermReport, setSearchTermReport] = React.useState('');

    const handleSearchReport = (event) => {
        setSearchTermReport(event.target.value);
    };

    const filteredDataReport = data.laporan.filter((row) => {
        return (
            row.user.nama.toLowerCase().includes(searchTermReport.toLowerCase()) || row.seller.nama.toLowerCase().includes(searchTermReport.toLowerCase())
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
                                value={searchTermRating}
                                onChange={handleSearchRating}
                            />
                        </React.Fragment>
                        {filteredDataRating && filteredDataRating.length > 0 &&  
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
                            {filteredDataRating.map((row, index) => (
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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <React.Fragment>
                            <Title>Customer Service</Title>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTermReport}
                                onChange={handleSearchReport}
                            />
                        </React.Fragment>
                        {filteredDataReport && filteredDataReport.length > 0 &&  
                        <Table size="small">
                            <TableHead>
                            <TableRow>
                                <TableCell>Customer</TableCell>
                                <TableCell>Buyer</TableCell>
                                <TableCell>Problem</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {filteredDataReport.map((row, index) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.user.nama}</TableCell>
                                    <TableCell>{row.seller.nama}</TableCell>
                                    <TableCell>{row.reason}</TableCell>
                                    <TableCell>
                                        <button
											onClick={() =>
												sendEmail(
													row.user.email,
													"Terima kasih telah menghubungi kami, Kami akan segera memproses laporan anda. Dan bila ada yang kuran jelas silahkan hubungi kami kembali di email ini.",
												)
											}
											className="bg-transparent border-0"
										>
											<img src={Help} style={{ width: "40px" }} />
										</button>
										<button
											onClick={() =>
												sendEmail(
													row.user.email,
													"Semua laporan anda telah kami proses, terima kasih telah menggunkan jasa layanan kami. Bila ada yang kurang jelas silahkan hubungi kami kembali di email ini.",
												)
											}
											className="bg-transparent border-0"
										>
											<img src={Accept} style={{ width: "45px" }} />
										</button>
										<button
											onClick={() => setSeller(row.seller.email)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop2"
											className="bg-transparent border-0"
										>
											<img src={Notification} style={{ width: "45px" }} />
										</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>}
                        <div
                        className="modal fade fontcustom"
                        id="staticBackdrop2"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex="-1"
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                        >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">
                                        Beli Sekarang
                                        </h5>
                                        <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => reset()}
                                        ></button>
                                    </div>
                                    <div className="modal-body row">
                                        <form className="text-center" onSubmit={handleSubmit(handlePopup)}>
                                            <textarea
                                                style={{width:"100%"}}
                                                rows="10"
                                                placeholder="NOTIFIKASI"
                                                {...register("pesan")}
                                            ></textarea>
                                            <button
                                                className="btn bg-danger text-white col-md-3 mx-auto"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                                type="submit">KIRIM
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </Grid>
            </Container>
        </Box>
    );
}