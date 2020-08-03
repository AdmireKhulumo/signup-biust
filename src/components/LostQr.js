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

export default function LostQr() {
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
		const { collection, id } = e.target.elements;

		if (!collection.value || !id.value) {
			setError("Please Fill In All Fields!");
			setOpen(true);
			return "";
		}

		//Checking if document exists in db
		db.collection(`${collection.value}`)
			.doc(`${id.value}`)
			.get()
			.then(function (doc) {
				if (!doc.exists) {
					setError("ID does not exist. Please register above.");
					setOpen(true);
				} else {
					console.log("success");
					const num = Math.floor(Math.random() * 10000) + 1000;
					setQrData(`BIUST_${collection.value}_${id.value}_${num}`);
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
						<Grid item xs={12} className={classes.radio}>
							<FormLabel component="legend" style={{ marginRight: "25px" }}>
								Select:{" "}
							</FormLabel>
							<RadioGroup
								aria-label="collection"
								name="collection"
								id="collection"
								className={classes.radio}
							>
								<FormControlLabel
									value="staff"
									control={<Radio />}
									label="Staff"
								/>
								<FormControlLabel
									value="students"
									control={<Radio />}
									label="Student"
								/>
							</RadioGroup>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="id"
								label="Staff / Student ID"
								name="id"
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
						<strong>Get QR Code</strong>
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
							{error} Try again or email admin at <i>covidbiust@biust.ac.bw</i>{" "}
							for help. Please include your student/staff ID.
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
