import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
	persist(
		(set) => ({
			// task related stuff
			tasks: [],
			addTask: (task) =>
				set((prev) => ({ tasks: [task, ...prev.tasks] })),
			removeTask: (task_id) =>
				set((prev) => ({
					tasks: prev.tasks.filter((task) => task.id !== task_id),
					completedTasks: prev.completedTasks.filter(
						(id) => id !== task_id,
					),
				})),
			likeTask: function (task_id) {
				return set((prev) => {
					for (let i = 0; i < prev.tasks.length; i++) {
						if (prev.tasks[i].id === task_id) {
							prev.tasks[i].liked = !prev.tasks[i].liked;
						}
					}
					return prev.tasks;
				});
			},

			// set Active Tasks
			activeTasks: [],
			setTaskActive: (task_id) =>
				set((prev) => {
					if (prev.activeTasks.includes(task_id)) {
						return {
							activeTasks: prev.activeTasks.filter(
								(id) => id !== task_id,
							),
						};
					}
					return {
						activeTasks: [task_id, ...prev.activeTasks],
					};
				}),

			// completed tasks functions
			completedTasks: [],
			addCompletedTask: (task_id) =>
				set((prev) => ({
					completedTasks: [
						task_id,
						...prev.completedTasks.filter((id) => id !== task_id),
					],
				})),
			removeCompletedTask: (task_id) =>
				set((prev) => ({
					completedTasks: prev.completedTasks.filter(
						(id) => id !== task_id,
					),
				})),
			resetCompletedTasks: () =>
				set((prev) => ({ completedTasks: [], activeTasks: [] })),

			// selected tasks functions
			selectedTasks: [],
			setSelectedTasks: (task_id) =>
				set((prev) => {
					if (prev.selectedTasks.includes(task_id)) {
						return {
							selectedTasks: prev.selectedTasks.filter(
								(id) => id !== task_id,
							),
						};
					}
					return {
						selectedTasks: [
							task_id,
							...prev.selectedTasks.filter(
								(id) => id !== task_id,
							),
						],
					};
				}),
			clearSelectedTasks: () => set((prev) => ({ selectedTasks: [] })),

			// tags functions
			tags: ["work", "home", "office"],
			addTag: (tag) => set((prev) => ({ tags: [tag, ...prev.tags] })),
			removeTag: (tag) =>
				set((prev) => ({ tags: prev.tags.filter((i) => i !== tag) })),

			// days names
			daysName: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
			date: null,
			setDate: (date) => set((prev) => ({ date })),

			// dark mode
			darkMode: false,
			setDarkMode: (darkMode) => set({ darkMode }),
		}),
		{
			name: "feather-store",
			partialize: (state) => ({
				tags: state.tags,
				completedTasks: state.completedTasks,
				tasks: state.tasks,
				darkMode: state.darkMode,
				date: state.date,
			}),
		},
	),
);
