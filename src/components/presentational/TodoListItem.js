import { forwardRef } from "react";
import {
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemButton,
	ListItemSecondaryAction
} from "@mui/material";

// hacking thru the Material UI to make my own ripples
// triggering them required to create references to the TouchRipple component

// Jest cannot resolve the following import,
// need to connect babel-loader to the Node.js test env
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

import {
	Lock as LockIcon,
	CheckBox as CheckBoxIcon,
	CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon
} from "@mui/icons-material";

import { TodoPriorityIcon } from ".";

export const todoListItemRipple = (taskArray, refs) => (task) => {
	taskArray.forEach((t, index) => {
		if (task.blockers.includes(t.id)) {
			const ripple = refs[index].current;
			ripple.start(
				{
					clientX: 0,
					clientY: 0
				},
				{ center: false } // when center is true, the ripple doesn't travel to the border of the container
			);
			setTimeout(() => ripple.stop({}), 200);
		}
	});
};

export const TodoListItem = forwardRef(
	(
		{
			border = true,
			title,
			status = "new",
			cost = 1,
			priority = 1,
			blockers = [],
			showBlockers = false,
			onClick = (f) => f
		},
		ref
	) => {
		const touchRippleProps =
			showBlockers && blockers.length > 0
				? { style: { color: "red" } }
				: {};

		return (
			<ListItem
				disablePadding
				sx={{
					pr: 0,
					mb: 1,
					borderRadius: 1,
					background: "#ffffff",
					border: border ? "1px solid #00000020" : "none",
					boxShadow: "0px 3px 10px #00000010",
					overflow: "hidden"
				}}
			>
				<ListItemButton
					sx={{ pr: 12 }}
					TouchRippleProps={touchRippleProps}
					onClick={onClick}
				>
					{blockers.length > 0 ? (
						<ListItemIcon sx={{ mr: 2, minWidth: "auto" }}>
							<LockIcon />
						</ListItemIcon>
					) : (
						status !== "new" && (
							<ListItemIcon sx={{ mr: 2, minWidth: "auto" }}>
								{status === "pending" ? (
									<CheckBoxOutlineBlankIcon />
								) : (
									<CheckBoxIcon />
								)}
							</ListItemIcon>
						)
					)}
					<ListItemText
						sx={
							status === "completed"
								? { textDecoration: "line-through" }
								: {}
						}
						primary={title}
					/>
					<TouchRipple ref={ref} style={{ color: "yellow" }} />
				</ListItemButton>
				<ListItemSecondaryAction>
					<div>{cost}H</div>
					<TodoPriorityIcon priority={priority} />
				</ListItemSecondaryAction>
			</ListItem>
		);
	}
);
