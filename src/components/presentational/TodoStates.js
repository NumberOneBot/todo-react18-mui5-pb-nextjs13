import { CircularProgress, Box } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const FullscreenBox = ({ children }) => {
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
			{children}
		</Box>
	);
};

export const TodoLoading = () => {
	return (
		<FullscreenBox>
			<CircularProgress />
		</FullscreenBox>
	);
};

export const TodoError = ({ message }) => {
	return (
		<FullscreenBox>
			<Box sx={{ color: "error.main", textAlign: "center", px: 6 }}>
				<ErrorIcon />
				<br />
				{String(message).split("\n")[0]}
			</Box>
		</FullscreenBox>
	);
};

export const TodoEmpty = () => {
	return (
		<Box textAlign="center" sx={{ pt: 2, color: "text.disabled" }}>
			The list is empty
		</Box>
	);
};
