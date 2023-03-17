import { CircularProgress, Box } from "@mui/material";

export const TodoLoading = () => {
	return (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				alignItems: "center",
				justifyContent: "center",
				display: "flex",
				height: "calc(100vh - 80px)"
			}}
		>
			<CircularProgress />
		</Box>
	);
};

export const TodoEmpty = () => {
	return (
		<Box textAlign="center" sx={{ pt: 2, color: "text.disabled" }}>
			The list is empty
		</Box>
	);
};
