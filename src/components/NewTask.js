import { useEffect, useState, useReducer } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	ToggleButtonGroup,
	ToggleButton
} from "@mui/material";
import {
	TodoPriorityIcon,
	TodoDialog,
	TodoBlockersList,
	TodoTasksDialog
} from "./presentational";
import { useTasks } from "../contexts/TasksContext";
import faker from "faker";

export default function NewTask({ open, close = (f) => f }) {
	const { addTask, isAddLoading } = useTasks();

	// because of the Controller overbloated props, switching to `react-hook-form` added more code lines and complexity than the basic solution with refs and states
	const {
		setValue,
		control,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			title: "",
			cost: "",
			priority: 1
		}
	});

	const [showBlockersDialog, toggleBlockersDialog] = useReducer(
		(value) => !value,
		false
	);

	const [blockersArray, setBlockersArray] = useState([]);

	// its actually `add` AND `close` actions, so check if the `blocker` arg is set
	const updateBlockersArray = (blocker) => {
		if (blocker) setBlockersArray([...blockersArray, blocker]);
		toggleBlockersDialog();
	};

	const fixIosScrollBug = () => {
		// iOS Safari scroll bug,
		// need to manually revert the page to the top after keyboard was closed (input focus lost)
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 0);
	};

	const submitForm = ({ title, cost, priority }) => {
		addTask({
			title,
			cost,
			priority,
			blockers: blockersArray.map((task) => task.id)
		});
		close();
	};

	useEffect(() => {
		if (open) {
			// blockers array is not part of the form, so we need to reset it manually
			setBlockersArray([]);
			reset();

			// FIXME: using faker as test data provider for testing purposes
			// remove this in production
			setValue("title", faker.company.catchPhrase());
			setValue("cost", (Math.random() * 5 + 1) >> 0);
			setValue("priority", (Math.random() * 3 + 1) >> 0);
		}
	}, [open]);

	return (
		<TodoDialog
			title="New task"
			open={open}
			close={close}
			submitTitle="Create"
			submit={handleSubmit(submitForm)}
		>
			<Box sx={{ mt: 1 }}>
				<Controller
					name="title"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<TextField
							{...field}
							error={!!errors.title}
							label="Title"
							fullWidth
							required
							autoComplete="Off"
							inputProps={{ tabIndex: "1" }}
							onBlur={fixIosScrollBug}
						/>
					)}
				/>
			</Box>
			<Box
				sx={{
					mt: 2,
					position: "relative",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center"
				}}
			>
				<Controller
					name="cost"
					control={control}
					rules={{ required: true, min: 1, max: 8 }}
					render={({ field }) => (
						<FormControl fullWidth error={!!errors.cost}>
							<InputLabel required id="select-label">
								Cost
							</InputLabel>
							<Select
								{...field}
								fullWidth
								required
								labelId="select-label"
								inputProps={{ tabIndex: "2" }}
								label="Cost"
							>
								{Array.from({ length: 8 }, (_, i) => i + 1).map(
									(i) => (
										<MenuItem key={i} value={i}>
											{i}H
										</MenuItem>
									)
								)}
							</Select>
						</FormControl>
					)}
				/>
				<Box
					sx={{
						display: { xs: "none", sm: "block" },
						ml: 2,
						color: "text.secondary"
					}}
				>
					Priority
				</Box>
				<Controller
					name="priority"
					control={control}
					rules={{ required: true }}
					render={({ field: { onChange, value } }) => (
						<ToggleButtonGroup
							value={value}
							onChange={(_, v) => onChange(v)}
							exclusive
							size="large"
							sx={{
								"ml": 2,
								"& .MuiToggleButton-root": {
									color: "text.primary"
								},
								"& .TodoPriorityIcon-root": {
									position: "relative",
									left: "-4px",
									top: "2px"
								}
							}}
						>
							{Array.from({ length: 3 }, (_, i) => i + 1).map(
								(i) => (
									<ToggleButton
										key={i}
										value={i}
										tabIndex={i + 2}
									>
										<TodoPriorityIcon priority={i} />
									</ToggleButton>
								)
							)}
						</ToggleButtonGroup>
					)}
				/>
			</Box>
			<TodoBlockersList
				blockers={blockersArray}
				onAdd={toggleBlockersDialog}
			/>
			<TodoTasksDialog
				title="Add Blocker"
				exclude={blockersArray}
				open={showBlockersDialog}
				close={updateBlockersArray}
			/>
		</TodoDialog>
	);
}
