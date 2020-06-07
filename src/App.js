import React, { useState } from "react";
import "./App.css";
import Staff from "./components/Staff";
import Student from "./components/Student";
import Navbar from "./components/Navbar";
import logo from "./images/biust-logo.png";

//MUI
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
	makeStyles,
	MuiThemeProvider,
	createMuiTheme
} from "@material-ui/core/styles";

//Creating Global MUI Theme
const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#f68951",
			light: "#33eaff",
			dark: "#00a0b2",
			contrastText: "#ffff"
		},
		secondary: {
			main: "#f68951",
			light: "#53c8ee",
			dark: "#00a0b2",
			contrastText: "#ffff"
		},
		textPrimary: {
			main: "#fff"
		}
	},
	typography: {
		useNextVariants: true
	}
});

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="primary" href="https://www.biust.ac.bw/" target="_blank">
				BIUST
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	mainBtn: {
		marginTop: "20px"
	}
}));

function App() {
	const classes = useStyles();
	const [signupType, setSignupType] = useState("");

	return (
		<MuiThemeProvider theme={theme}>
			<Navbar />
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<img
						src={logo}
						width="250px"
						height="140px"
						alt="biust logo"
						onClick={() => window.location.reload()}
						style={{ cursor: "pointer" }}
					/>
					<Typography component="h1" variant="h5" style={{ marginTop: "10px" }}>
						<strong>Sign Up</strong>
					</Typography>
					<Typography variant="overline" style={{ marginTop: "10px" }}>
						Signup As:{" "}
					</Typography>
					<Button
						onClick={() => setSignupType("student")}
						fullWidth
						variant="contained"
						color="primary"
						className={classes.mainBtn}
					>
						<Typography variant="button">
							<strong>STUDENT</strong>
						</Typography>
					</Button>
					<Button
						onClick={() => setSignupType("staff")}
						fullWidth
						variant="contained"
						color="primary"
						className={classes.mainBtn}
					>
						<Typography variant="button">
							<strong>Staff Member</strong>
						</Typography>
					</Button>

					{signupType === "student" && <Student />}
					{signupType === "staff" && <Staff />}
				</div>

				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
		</MuiThemeProvider>
	);
}

export default App;
