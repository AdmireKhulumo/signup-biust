import React, { useState } from "react";
import "./App.css";
import Staff from "./components/Staff";
import Student from "./components/Student";

//MUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
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
	console.log(signupType);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
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
					Student
				</Button>
				<Button
					onClick={() => setSignupType("staff")}
					fullWidth
					variant="contained"
					color="primary"
					className={classes.mainBtn}
				>
					Staff Member
				</Button>

				{signupType === "student" && <Student />}
				{signupType === "staff" && <Staff />}
			</div>

			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}

export default App;
