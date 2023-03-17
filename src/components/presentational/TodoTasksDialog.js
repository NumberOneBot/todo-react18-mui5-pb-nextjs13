import { List } from "@mui/material";
import { TodoDialog, TodoListItem } from ".";
import { useTasks } from "../../contexts/TasksContext";

// not really a pure component, as it still manipulates the context

export const TodoTasksDialog = ({
	exclude = [],
	title = "Add Task",
	open,
	close = (f) => f
}) => {
	const { tasks } = useTasks();
	const tasksLeft = tasks.filter(
		(task) => !exclude.includes(task) && task.status === "new"
	);

	return (
		<TodoDialog title={title} open={open} close={() => close()}>
			<List sx={{ m: 0, pt: 0 }}>
				{tasksLeft.map((task, i) => (
					<TodoListItem
						border
						key={i}
						onClick={() => close(task)}
						{...task}
					/>
				))}
			</List>
		</TodoDialog>
	);
};
