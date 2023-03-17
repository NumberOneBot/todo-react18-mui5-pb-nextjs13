import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const TodoAppBar = ({ disabled, title, onClick, button }) => {
	return (
		<AppBar sx={{ mt: 2 }} position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					{title}
				</Typography>
				<Button
					disabled={disabled}
					sx={{
						color: "primary.contrastText",
						borderColor: "primary.dark"
					}}
					variant="outlined"
					onClick={onClick}
				>
					<AddIcon />
					{button}
				</Button>
			</Toolbar>
		</AppBar>
	);
};
