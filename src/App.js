"use client";

// react libraries
import { useReducer, lazy, Suspense } from "react";
// react-query
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();
// react-router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import packageJson from "../package.json";
// material ui
import { CssBaseline, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
// ToDo app components
import {
	TodoTheme,
	TodoBottomBar,
	TodoLoading
} from "./components/presentational";
import { TasksProvider } from "./contexts/TasksContext";
import Planner from "./components/Planner";
import NewTask from "./components/NewTask";
import Admit from "./components/Admit";
// lazy loading of the second tab view isn't necessary for now
// but it's a good example of how to use lazy loading and Suspense
const Today = lazy(() => import("./components/Today"));
// import Today from "./components/Today";

// if we do lazy loading for different parts of the app we also need to bundle
// all MaterialUI components into one file to prevent splitting them into million chunks
// `optimization.splitChunks.cacheGroups.vendor` path in the webpack's config is responsible for this

export default function App() {
	const [showAdmit, toggleAdmit] = useReducer((value) => !value, false);
	const [showNew, toggleNew] = useReducer((value) => !value, false);

	return (
		<QueryClientProvider client={queryClient}>
			<Router basename={packageJson.homepage}>
				<ThemeProvider theme={TodoTheme}>
					<CssBaseline />
					<TasksProvider>
						<Container maxWidth="lg">
							<Suspense fallback={<TodoLoading />}>
								<Routes>
									<Route
										path="/"
										element={
											<Planner
												toggleNew={toggleNew}
												toggleAdmit={toggleAdmit}
											/>
										}
									/>
									<Route
										path="/today/:sortMode?"
										element={
											<Today toggleAdmit={toggleAdmit} />
										}
									/>
								</Routes>
							</Suspense>
						</Container>
						<NewTask open={showNew} close={toggleNew} />
						<Admit open={showAdmit} close={toggleAdmit} />
					</TasksProvider>
					<TodoBottomBar />
				</ThemeProvider>
			</Router>
		</QueryClientProvider>
	);
}
