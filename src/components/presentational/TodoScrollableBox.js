import { Box, Container } from "@mui/material";

export const TodoScrollableBox = ({ children }) => {
	return (
		<Box
			sx={{
				zIndex: 1,
				position: "relative",
				height: {
					sm: "calc(100vh - 80px)",
					xs: "calc(100vh - 96px)"
				},
				mx: { sm: -3, xs: -2 },
				px: { sm: 2, xs: 2 },
				overflow: "auto"
			}}
		>
			<Container maxWidth="sm" sx={{ pb: { xs: "82px", sm: "78px" } }}>
				{children}
			</Container>
		</Box>
	);
};
