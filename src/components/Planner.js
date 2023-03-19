import { createRef } from "react";
import { List, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTasks } from "../contexts/TasksContext";
import {
	TodoAppBar,
	TodoScrollableBox,
	TodoListItem,
	TodoLoading,
	TodoEmpty,
	TodoError,
	todoListItemRipple
} from "./presentational";

const Planner = ({ toggleAdmit, toggleNew }) => {
	const { tasks, isLoading, isError, tasksError: errorMessage } = useTasks();
	const newTasks = tasks.filter((task) => task.status === "new");

	const itemRefs = newTasks.map(() => createRef());
	const blockerClicker = todoListItemRipple(newTasks, itemRefs);
	const disabled = isError || isLoading;

	return (
		<>
			<TodoAppBar
				title="Planner"
				button="Add"
				onClick={toggleNew}
				disabled={disabled}
			/>
			{isLoading && <TodoLoading />}
			{isError && <TodoError message={errorMessage} />}
			{!isError && !isLoading && (
				<>
					<TodoScrollableBox>
						{newTasks.length > 0 && (
							<>
								<List sx={{ mt: 2, background: "none" }}>
									{newTasks.map((task, i) => (
										<TodoListItem
											key={task.id}
											border={false}
											ref={itemRefs[i]}
											showBlockers
											onClick={() => blockerClicker(task)}
											{...task}
										/>
									))}
								</List>
								<Box textAlign="center">
									<Button
										variant="contained"
										onClick={toggleAdmit}
									>
										<AddIcon />
										Admit
									</Button>
								</Box>
							</>
						)}
					</TodoScrollableBox>
					{newTasks.length === 0 && <TodoEmpty />}
				</>
			)}
		</>
	);
};

export default Planner;
