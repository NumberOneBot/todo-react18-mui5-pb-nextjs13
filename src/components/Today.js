import { useState, useEffect, createRef } from "react";
import {
	Box,
	List,
	ToggleButton,
	ToggleButtonGroup,
	Button
} from "@mui/material";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import {
	TodoAppBar,
	TodoScrollableBox,
	TodoLoading,
	TodoEmpty,
	TodoListItem,
	todoListItemRipple
} from "./presentational";
import { useTasks } from "../contexts/TasksContext";

export default function Today({ toggleAdmit }) {
	const { tasks, isLoading, completeTask, removeCompleted } = useTasks();
	const [sortMode, setSortMode] = useState(() => {
		const storedSortMode = localStorage.getItem("sortMode");
		return storedSortMode !== null ? storedSortMode : "all";
	});

	const todayTasks = [];
	let pendingTasksCost = 0;
	let pendingTasksCount = 0;
	let newTasksCount = 0;
	let completedTasksCount = 0;

	tasks.forEach((task) => {
		if (
			task.status === sortMode || // "pending" or "completed"
			(sortMode === "all" && task.status !== "new") // "all"
		) {
			todayTasks.push(task);
		}

		if (task.status === "new") {
			newTasksCount++;
		}

		if (task.status === "completed") {
			completedTasksCount++;
		}

		if (task.status === "pending") {
			pendingTasksCost += parseInt(task.cost, 10);
			pendingTasksCount++;
		}
	});

	const sortedTodayTasks = todayTasks.sort((a, b) => b.admitAt - a.admitAt);
	const disabled = newTasksCount === 0;

	useEffect(() => {
		localStorage.setItem("sortMode", sortMode);
	}, [sortMode]);

	const itemRefs = todayTasks.map(() => createRef());
	const blockerClicker = todoListItemRipple(todayTasks, itemRefs);

	const itemClick = (task) => {
		if (task.blockers.length) {
			blockerClicker(task);
			return;
		}
		completeTask(task.id);
	};

	return (
		<>
			<TodoAppBar
				title="Today"
				button="Admit"
				disabled={disabled}
				onClick={toggleAdmit}
			/>
			<TodoScrollableBox>
				{isLoading && <TodoLoading />}
				<Box textAlign="center">
					<ToggleButtonGroup
						size="small"
						sx={{
							mt: 2,
							mb: 1,
							background: "#fff"
						}}
						exclusive
						value={sortMode}
						onChange={
							(e, value) => value !== null && setSortMode(value) // value can be null if the user clicks the same button twice
						}
					>
						<ToggleButton value="all">All</ToggleButton>
						<ToggleButton value="pending">Pending</ToggleButton>
						<ToggleButton value="completed">Completed</ToggleButton>
					</ToggleButtonGroup>
				</Box>
				{sortedTodayTasks.length > 0 && (
					<>
						<List sx={{ m: 0, py: 1, background: "none" }}>
							{sortedTodayTasks.map((task, i) => (
								<TodoListItem
									key={task.id}
									ref={itemRefs[i]}
									border={false}
									showBlockers
									{...task}
									onClick={() => itemClick(task)}
								/>
							))}
						</List>
						{sortMode !== "pending" && completedTasksCount > 0 && (
							<Box sx={{ mb: 1 }} textAlign="center">
								<Button
									variant="contained"
									onClick={removeCompleted}
								>
									<RemoveDoneIcon sx={{ mr: 1 }} /> Remove
									completed
								</Button>
							</Box>
						)}
						{sortMode !== "completed" && pendingTasksCount > 0 && (
							<Box
								textAlign="center"
								sx={{ color: "text.disabled" }}
							>
								{pendingTasksCount} Remaining (Total{" "}
								{pendingTasksCost} hours)
							</Box>
						)}
					</>
				)}
				{!isLoading && sortedTodayTasks.length === 0 && <TodoEmpty />}
			</TodoScrollableBox>
		</>
	);
}
