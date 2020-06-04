import React, { useState } from "react";
import { db } from "../firebase";
import SuccessfulSignup from "./SuccessfulSignup";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import {
	Button,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormLabel,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Grid,
	TextField
} from "@material-ui/core";

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
	},
	radio: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	},
	radioSet: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	}
}));

export default function Student() {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [qrData, setQrData] = useState("");

	const handleClose = () => {
		setOpen(false);
	};

	const submitDetails = (e) => {
		e.preventDefault();
		const {
			fName,
			sName,
			email,
			gender,
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
							gender: gender.value,
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
					console.log(incampus.value);
					console.log(education.value);
					const num = Math.floor(Math.random() * 10000) + 1000;
					setQrData(`BIUST_students_${studentId.value}_${num}`);
					setSuccess(true);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			{success === false && (
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
						<Grid item xs={12} className={classes.radio}>
							<FormLabel component="legend" style={{ marginRight: "25px" }}>
								Gender:{" "}
							</FormLabel>
							<RadioGroup
								aria-label="gender"
								name="gender"
								id="gender"
								className={classes.radio}
							>
								<FormControlLabel value="M" control={<Radio />} label="Male" />
								<FormControlLabel
									value="F"
									control={<Radio />}
									label="Female"
								/>
							</RadioGroup>
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

						<Grid item xs={12} className={classes.radio}>
							<FormLabel component="legend" style={{ marginRight: "15px" }}>
								On Campus Resident?
							</FormLabel>
							<RadioGroup
								aria-label="incampus"
								name="incampus"
								id="incampus"
								className={classes.radio}
							>
								<FormControlLabel value="yes" control={<Radio />} label="YES" />
								<FormControlLabel value="no" control={<Radio />} label="NO" />
							</RadioGroup>
						</Grid>
						<Grid item xs={12}>
							<FormLabel component="legend">Current Level Of Study: </FormLabel>
							<RadioGroup
								aria-label="education"
								name="education"
								id="education"
								className={classes.radio}
							>
								<FormControlLabel
									value="UG"
									control={<Radio />}
									label="Undergraduate"
								/>
								<FormControlLabel
									value="PG"
									control={<Radio />}
									label="Postgraduate"
								/>
							</RadioGroup>
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
						<strong>Sign Up</strong>
					</Button>
				</form>
			)}

			{success === true && <SuccessfulSignup qrData={qrData} />}

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
