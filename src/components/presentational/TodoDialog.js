import { forwardRef } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	Button,
	Slide
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DialogTransition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const TodoDialog = ({
	maxHeight = "auto",
	children,
	disabled = false,
	open = false,
	title = "Dialog window",
	submitTitle = "Submit",
	close = (f) => f,
	submit = false
}) => {
	return (
		<Dialog
			TransitionComponent={DialogTransition}
			keepMounted
			open={open}
			onClose={close}
			scroll="paper"
			maxWidth="xs"
			fullWidth={true}
		>
			<DialogTitle sx={{ m: 0, p: 2 }}>
				{title}
				<IconButton
					tabIndex={-1}
					onClick={close}
					sx={{
						position: "absolute",
						right: 8,
						top: 12,
						color: "text.primary"
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ maxHeight }}>{children}</DialogContent>
			{typeof submit === "function" && (
				<DialogActions>
					<Button
						sx={{ flex: 1 }}
						disabled={disabled}
						variant="contained"
						tabIndex={10}
						onClick={submit}
					>
						{submitTitle}
					</Button>
				</DialogActions>
			)}
		</Dialog>
	);
};
