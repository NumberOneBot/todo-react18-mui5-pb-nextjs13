import { Button, List, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTasks } from "../../contexts/TasksContext";
import { TodoListItem } from ".";

export const TodoBlockersList = ({ blockers = [], onAdd = (f) => f }) => {
	const { tasks } = useTasks();
	const newTasks = tasks.filter((task) => task.status === "new");

	return (
		<>
			{blockers.length > 0 && (
				<>
					<Typography component="div" sx={{ mt: 2, pl: 2 }}>
						Blockers
					</Typography>
					<List sx={{ p: 0, m: 0 }}>
						{blockers.map((blocker, i) => (
							<TodoListItem border={true} key={i} {...blocker} />
						))}
					</List>
				</>
			)}
			{blockers.length !== newTasks.length && (
				<Box sx={{ mt: 2 }} textAlign="center">
					<Button variant="contained" sx={{}} onClick={() => onAdd()}>
						<AddIcon />
						Add blocker
					</Button>
				</Box>
			)}
		</>
	);
};
