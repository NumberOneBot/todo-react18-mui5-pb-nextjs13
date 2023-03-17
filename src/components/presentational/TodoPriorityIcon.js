import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

export const TodoPriorityIcon = ({ priority = 1 }) => {
	return (
		<div
			className="TodoPriorityIcon-root"
			style={{
				marginLeft: "8px",
				position: "relative",
				lineHeight: "1em"
			}}
		>
			<div
				style={{
					position: "absolute",
					overflow: "hidden",
					width: (24 / 3) * priority
				}}
			>
				<SignalCellularAltIcon />
			</div>
			<SignalCellularAltIcon sx={{ color: "background.default" }} />
		</div>
	);
};
