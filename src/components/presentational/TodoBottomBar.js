import { useState, useEffect } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
	PlaylistAdd as PlaylistAddIcon,
	PlaylistAddCheck as PlaylistAddCheckIcon
} from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";

export const TodoBottomBar = () => {
	const location = useLocation();
	const [value, setValue] = useState(location.pathname);

	return (
		<BottomNavigation
			value={value.indexOf("/today") !== -1 ? "/today/all" : value}
			showLabels
			sx={{
				backgroundColor: "#ffffff50",
				backdropFilter: "blur(5px)",
				position: "fixed",
				zIndex: 2,
				bottom: 0,
				left: 0,
				right: 0,
				pb: { xs: 3, sm: 0 }, // spacer added for mobile phone's native bottom bar
				height: { xs: 90, sm: 60 } // looks like they manually specified the height
			}}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
		>
			<BottomNavigationAction
				component={NavLink}
				to="/"
				label="Planner"
				value="/"
				icon={<PlaylistAddIcon />}
			/>
			<BottomNavigationAction
				component={NavLink}
				to="/today/all"
				label="Today"
				value="/today/all"
				icon={<PlaylistAddCheckIcon />}
			/>
		</BottomNavigation>
	);
};
