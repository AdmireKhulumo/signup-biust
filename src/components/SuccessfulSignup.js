import React from "react";
import QRCode from "qrcode.react";
import { Email, Item, Span, A, renderEmail } from "react-html-email";
import logosmall from "../images/biust_logo_small.png";

//MUI
import { Typography, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	main: {
		display: "flex",
		marginTop: theme.spacing(1),
		flexDirection: "column",
		alignItems: "center"
	}
}));

function SuccessfulSignup(props) {
	const classes = useStyles();

	//QR code link
	const downloadQR = () => {
		const canvas = document.getElementById("qrcodecanvas");
		const pngUrl = canvas
			.toDataURL("image/png")
			.replace("image/png", "image/octet-stream");
		let downloadLink = document.createElement("a");
		downloadLink.href = pngUrl;
		downloadLink.download = "qrcodecanvas.png";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	//email template to send
	/*const emailHTML = renderEmail(
		<Email title="Hello World!">
			<Item align="center">
				<Span fontSize={20}>
					Hello There, Here is your qr code
					<QRCode
						value={props.qrData}
						size={300}
						imageSettings={{
							src: "src/images/biust_logo_small.png",
							x: null,
							y: null,
							height: 25,
							width: 25,
							excavate: true
						}}
					/>
				</Span>
			</Item>
		</Email>
	);

	const templateId = "template_kD8s4YUf";
	sendFeedback(templateId, {
		message_html: emailHTML,
		from_name: "AdmireFromName",
		reply_to: "AdmireReplyToEmail",
		to_email: "admirekhulumo@gmail.com"
	});

	function sendFeedback(templateId, variables) {
		window.emailjs
			.send("gmail", templateId, variables)
			.then((res) => {
				console.log("Email successfully sent.");
			})
			.catch((error) => {
				console.log(error);
			});
	}*/

	return (
		<div className={classes.main}>
			<Typography variant="overline" style={{ color: "#32CD32" }}>
				<strong>Click below to save your QR Code.</strong>
			</Typography>
			<QRCode
				id="qrcodecanvas"
				value={props.qrData}
				size={350}
				includeMargin={true}
				level={"H"}
				imageSettings={{
					src: logosmall,
					x: null,
					y: null,
					height: 50,
					width: 50,
					excavate: true
				}}
			/>

			<Button
				style={{ marginTop: "10px" }}
				onClick={downloadQR}
				variant="contained"
				color="primary"
				size="large"
				startIcon={<SaveIcon />}
			>
				Save QR Code
			</Button>
			<Typography variant="caption" style={{ marginTop: "15px" }}>
				<i>Click on BIUST logo to signup again.</i>
			</Typography>
		</div>
	);
}

export default SuccessfulSignup;
