import { createTheme } from "@mui/material/styles";

export const TodoTheme = createTheme({
	palette: {
		type: "light",
		background: {
			default: "#ddd",
			paper: "#fff"
		}
		// primary: {
		// 	main: "#4C6EF5"
		// }
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: ({ theme }) =>
					theme.unstable_sx({
						borderRadius: 1
					})
			}
		},
		MuiList: {
			styleOverrides: {
				root: ({ theme }) =>
					theme.unstable_sx({
						my: 2,
						p: 0,
						width: "100%",
						bgcolor: "background.paper",
						color: "text.secondary",
						borderRadius: 1
					})
			}
		},
		MuiListItemSecondaryAction: {
			styleOverrides: {
				root: ({ theme }) =>
					theme.unstable_sx({
						pointerEvents: "none",
						display: "flex",
						width: 60,
						alignItems: "center",
						justifyContent: "space-between"
					})
			}
		}
	}
});
