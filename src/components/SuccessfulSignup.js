import React from "react";
import QRCode from "qrcode.react";
import { Email, Item, Span, A, renderEmail } from "react-html-email";
import logosmall from "../images/biust_logo_small.png";

function SuccessfulSignup(props) {
	console.log(props.qrData);

	//email template to send
	const emailHTML = renderEmail(
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
	}

	return (
		<div>
			<p>Sucess Message</p>
			<QRCode
				value={props.qrData}
				size={300}
				renderAs={"svg"}
				imageSettings={{
					src: { logosmall },
					x: null,
					y: null,
					height: 25,
					width: 25,
					excavate: true
				}}
			/>
		</div>
	);
}

export default SuccessfulSignup;
