import React, { useState } from "react";
import { db } from "../firebase";
import SuccessfulSignup from "./SuccessfulSignup";

//MUI
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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function SignUp() {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [qrData, setQrData] = useState("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const submitDetails = (e) => {
		e.preventDefault();
		const {
			fName,
			sName,
			email,
			studentId,
			officialId,
			contactNum,
			physicalAdd,
			incampus,
			education,
			programme
		} = e.target.elements;

		//Checking if email already exists in db
		db.collection("students")
			.doc(`${studentId.value}`)
			.get()
			.then(function (doc) {
				if (doc.exists) {
					setError("Student ID Alreaddy Exists.");
					setOpen(true);
				} else {
					db.collection("students")
						.doc(`${studentId.value}`)
						.set({
							name: `${fName.value} ${sName.value}`,
							email: email.value,
							studentId: studentId.value,
							officialId: officialId.value,
							contactNum: contactNum.value,
							physicalAdd: physicalAdd.value,
							incampus: incampus.value,
							education: education.value,
							programme: programme.value
						})
						.catch((error) => {
							console.log(error);
						});
					console.log("successful signup");
					const num = Math.floor(Math.random() * 10000) + 1000;
					setQrData(`students_${studentId.value}_${num}`);
					setSuccess(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			{success == false && (
				<form className={classes.form} noValidate onSubmit={submitDetails}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								//autoComplete="fname"
								name="fName"
								variant="outlined"
								required
								fullWidth
								id="fName"
								label="First Name"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="sName"
								label="Last Name"
								name="sName"
								//autoComplete="lname"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="studentId"
								label="Student ID"
								name="studentId"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="officialId"
								label="Official ID"
								name="officialId"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="contactNum"
								label="Contact Number"
								name="contactNum"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="physicalAdd"
								label="Physical Address"
								name="physicalAdd"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="incampus"
								label="On Campus?"
								name="incampus"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="education"
								label="Educational Level"
								name="education"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="programme"
								label="Study Programme"
								name="programme"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
				</form>
			)}

			{success == true && <SuccessfulSignup qrData={qrData} />}

			{/*--------Dialogue For Already existing document-------*/}
			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{error} Please try again or contact admin.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary" autoFocus>
							OK
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
}
