import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import PocketBase from "pocketbase";

const pb = new PocketBase(
	process.env.REACT_APP_PB_URL || process.env.NEXT_PUBLIC_PB_URL
);

// items 'blocked by something' should be at the bottom of the list
const taskCost = (t) => (!t.blockers.length ? t.priority * 10 + t.cost : 0);
export const taskSortFunction = (a, b) => taskCost(b) - taskCost(a);

const TasksContext = createContext();
export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
	const queryClient = useQueryClient();

	const {
		data: tasks = [],
		isLoading,
		isError,
		error: tasksError,
		refetch
	} = useQuery(
		"tasks",
		async () => {
			if (pb.authStore.isValid === false)
				await pb.admins.authWithPassword(
					process.env.REACT_APP_PB_ADMIN_EMAIL ||
						process.env.NEXT_PUBLIC_PB_ADMIN_EMAIL,
					process.env.REACT_APP_PB_ADMIN_PASSWORD ||
						process.env.NEXT_PUBLIC_PB_ADMIN_PASSWORD
				);
			const data = await pb.collection("todo").getFullList();
			return data;
		},
		{
			retry: false
			// onSuccess: () => console.log("tasks loaded"),
			// onError: (e) => console.log("tasks load error", e)
		}
	);

	// PocketBase doesn`t support batch updates, so we`ll use Promise.all
	const updateTasks = async (tasks, action = "update") => {
		await Promise.all(
			tasks.map(async (task) => {
				await pb.collection("todo")[action](task.id, task);
			})
		);
	};

	const {
		mutate: addTask,
		isLoading: isAddLoading,
		isError: isAddError
	} = useMutation(async (newTask) => {
		const record = await pb
			.collection("todo")
			.create({ ...newTask, status: "new" });
		queryClient.setQueryData("tasks", (old) => [...old, record]);
	});

	const {
		mutate: admitTasks,
		isLoading: isAdmitLoading,
		isError: isAdmitError
	} = useMutation(async (taskIds) => {
		const updatedTasks = [];
		// cloning tasks list to update the cache
		// and creating updated tasks list for PB sync at the same time
		const allTasks = tasks.map((task) => {
			if (taskIds.includes(task.id)) {
				// admitting task
				const updatedTask = {
					...task,
					status: "pending",
					admitAt: Date.now() + taskCost(task) // adding task cost to timestamp as .milliseconds
				};
				updatedTasks.push(updatedTask);
				return updatedTask;
			} else {
				return task;
			}
		});

		await updateTasks(updatedTasks);
		queryClient.setQueryData("tasks", () => allTasks);
	});

	const {
		mutate: completeTask,
		isLoading: isCompleteLoading,
		isError: isCompleteError
	} = useMutation(async (taskId) => {
		const updatedTasks = [];
		// cloning tasks list to update the cache
		// and creating updated tasks list for PB sync at the same time
		const allTasks = tasks.map((task) => {
			let updatedTask;
			if (task.id === taskId) {
				// completing task
				updatedTask = {
					...task,
					status: "completed"
				};
				updatedTasks.push(updatedTask);
				return updatedTask;
			} else if (task.blockers.includes(taskId)) {
				// removing completed task from blockers lists of other tasks
				updatedTask = {
					...task,
					blockers: task.blockers.filter((id) => id !== taskId)
				};
				updatedTasks.push(updatedTask);
				return updatedTask;
			}
			return task;
		});

		await updateTasks(updatedTasks);
		queryClient.setQueryData("tasks", () => allTasks);
	});

	const {
		mutate: removeCompleted,
		isLoading: isRemoveLoading,
		isError: isRemoveError
	} = useMutation(async () => {
		const updatedTasks = [];
		// cloning tasks list to update the cache
		// and creating updated tasks list for PB sync at the same time
		const allTasks = tasks.filter((task) => {
			if (task.status === "completed") {
				// removing completed task
				updatedTasks.push(task);
				return null;
			} else {
				return task;
			}
		});

		// batch delete
		await updateTasks(updatedTasks, "delete");
		queryClient.setQueryData("tasks", () => allTasks);
	});

	return (
		<TasksContext.Provider
			value={{
				tasks,
				isLoading,
				isError,
				tasksError,

				addTask,
				isAddLoading,
				isAddError,

				admitTasks,
				isAdmitLoading,
				isAdmitError,

				completeTask,
				isCompleteLoading,
				isCompleteError,

				removeCompleted,
				isRemoveLoading,
				isRemoveError
			}}
		>
			{children}
		</TasksContext.Provider>
	);
};
