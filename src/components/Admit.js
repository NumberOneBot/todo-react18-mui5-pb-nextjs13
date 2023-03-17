import React, { useState, useEffect, useLayoutEffect, useReducer } from "react";
import {
	Typography,
	List,
	FormControl,
	Select,
	InputLabel,
	MenuItem,
	Grid,
	Box,
	Button
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTasks, taskSortFunction } from "../contexts/TasksContext";
import { TodoDialog, TodoTasksDialog, TodoListItem } from "./presentational";

const workingHoursPerDay = 8;

export default function Admit({ open, close = (f) => f }) {
	const { tasks, admitTask, admitTasks } = useTasks();

	const [capacity, setCapacity] = useState(8);
	const [manualTasks, setManualTasks] = useState([]);
	const [openManualTasks, toggleManualTasks] = useReducer(
		(state) => !state,
		false
	);

	// dark wizardry happens here
	// TODO: need to cover it with tests
	const newTasks = tasks.filter((task) => task.status === "new");
	const sortedTasks = newTasks.sort(taskSortFunction);
	const filteredTasks = sortedTasks.reduce((array, task) => {
		const currentCost = array.reduce((sum, t) => sum + t.cost, 0);

		return currentCost + task.cost <= capacity &&
			(task.blockers.length === 0 ||
				task.blockers.every((obj) =>
					array.map((obj) => obj.id).includes(obj)
				))
			? [...array, task] // add task to the pool
			: array;
	}, []);

	const combinedTasks = [...filteredTasks, ...manualTasks];
	const totalCost = combinedTasks.reduce((acc, task) => acc + task.cost, 0);
	const disabledFormSubmit = combinedTasks.length === 0;

	useLayoutEffect(() => {
		setManualTasks([]);
	}, [capacity]);

	useEffect(() => {
		let hoursLeft = tasks.reduce(
			(hours, task) =>
				task.status === "pending" ? hours - task.cost : hours,
			workingHoursPerDay
		);
		hoursLeft = hoursLeft < 0 ? 0 : hoursLeft;

		setCapacity(hoursLeft);
	}, [tasks, open]);

	const updateManualTasks = (task) => {
		task && setManualTasks([...manualTasks, task]);

		toggleManualTasks();
	};

	const reset = () => {
		// reset manual tasks added to the list
		setManualTasks([]);
	};

	const cancel = () => {
		reset();
		close();
	};

	const submit = () => {
		if (!combinedTasks.length) return;

		admitTasks(combinedTasks.map((t) => t.id));

		reset();
		close();
	};

	return (
		<TodoDialog
			open={open}
			disabled={disabledFormSubmit}
			title="Admit"
			submitTitle="Admit"
			close={cancel}
			submit={submit}
		>
			<Typography component="div" sx={{ mb: 1, pl: 2 }}>
				Tasks suggested
			</Typography>{" "}
			{combinedTasks.length > 0 ? (
				<List sx={{ m: 0 }}>
					{combinedTasks.map((task, i) => (
						<TodoListItem border={true} key={i} {...task} />
					))}
				</List>
			) : (
				<Typography
					sx={{ textAlign: "center", color: "text.disabled" }}
				>
					No automatic suggestions
				</Typography>
			)}
			{combinedTasks.length !== newTasks.length && (
				<Box sx={{ mt: 2 }} textAlign="center">
					<Button variant="contained" onClick={toggleManualTasks}>
						<AddIcon />
						Add manually
					</Button>
				</Box>
			)}
			<TodoTasksDialog
				exclude={combinedTasks}
				open={openManualTasks}
				close={updateManualTasks}
			/>
			<Grid sx={{ mt: 2 }} container spacing={2}>
				<Grid item xs={4}>
					<FormControl fullWidth>
						<InputLabel id="select-label">Capacity</InputLabel>
						<Select
							fullWidth
							labelId="select-label"
							value={capacity}
							label="Capacity"
							onChange={(e) => setCapacity(e.target.value)}
						>
							{Array.from({ length: 9 }, (_, i) => i).map((i) => (
								<MenuItem disabled={i === 0} key={i} value={i}>
									{i}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={8} sx={{ textAlign: "right" }}>
					Total
					<Typography
						variant="h5"
						sx={{
							color:
								totalCost <= capacity
									? "success.main"
									: "error.main"
						}}
					>
						{totalCost}H
					</Typography>
				</Grid>
				<Typography
					component="div"
					sx={{ p: 2, pb: 0, color: "text.disabled" }}
				>
					Suggested capacity based on pending tasks
				</Typography>
			</Grid>
		</TodoDialog>
	);
}
