import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	AppBar,
	Toolbar,
	Typography,
	CssBaseline,
	useScrollTrigger
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
		//backgroundColor: "rgba(255, 173, 0, .6)",
		//backgroundImage: `url(${bg})`,
		//color: "#000"
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		align: "center",
		color: "#fff"
	}
}));

function ElevationScroll(props) {
	const { children, window } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0
	});
}

export default function MenuAppBar(props) {
	const classes = useStyles();
	const [auth, setAuth] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	return (
		<div>
			<React.Fragment>
				<CssBaseline />
				<ElevationScroll {...props}>
					<AppBar>
						<Toolbar>
							<div
								style={{
									float: "none",
									marginLeft: "auto",
									marginRight: "auto"
								}}
							>
								<Typography variant="h4" className={classes.title}>
									<strong> BIUST REGISTER</strong>
								</Typography>
							</div>
						</Toolbar>
					</AppBar>
				</ElevationScroll>
				<Toolbar />
			</React.Fragment>
		</div>
	);
}
