import { format, isPast } from "date-fns";
import Home from "./screens/Home";
import Form from "./screens/Form";
import Splash from "./screens/Splash";
import {
    PlusSmallIcon,
    TrashIcon,
    PencilIcon,
    XMarkIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useStore } from "./util/useStore";

export default function App(props) {
    const tasks = useStore((state) => state.tasks);
    const selectedTasks = useStore((state) => state.selectedTasks);
    const clearSelectedTasks = useStore((state) => state.clearSelectedTasks);
    const removeTask = useStore((state) => state.removeTask);
    const likeTask = useStore((state) => state.likeTask);
    const resetCompletedTasks = useStore((state) => state.resetCompletedTasks);
    const setTaskActive = useStore((state) => state.setTaskActive);
    const date = useStore((state) => state.date);
    const setDate = useStore((state) => state.setDate);

    const [showAddForm, setShowAddForm] = useState(false);
    const [showTagEditor, setShowTagEditor] = useState(false);

    useEffect(() => {
        if (date && isPast(date)) {
            resetCompletedTasks();
            setDate(new Date().toJSON());
        }
        let day = format(new Date(), "ccc").toLowerCase();
        tasks.forEach((task) => {
            if (task.days.includes(day)) {
                setTaskActive(task.id);
            }
        });
    }, []);

    return (
        <>
            <Splash />
            <Home
                setShowAddForm={setShowAddForm}
                setShowTagEditor={setShowTagEditor}
            />
            {showAddForm && <Form setShowAddForm={setShowAddForm} />}
            <div className="fixed bottom-0 right-0 m-6 flex items-center gap-2">
                {selectedTasks.length > 0 ? (
                    <>
                        <button
                            className="p-3 bg-red-500 rounded-full text-white"
                            onClick={(e) => {
                                selectedTasks.forEach((task) =>
                                    removeTask(task)
                                );
                            }}
                        >
                            <TrashIcon className="w-6 h-6" />
                        </button>
                        <button
                            className="p-3 bg-slate-blue rounded-full text-white dark:text-black"
                            onClick={(e) => {
                                selectedTasks.forEach((task_id) => {
                                    likeTask(task_id);
                                });
                            }}
                        >
                            <HeartIcon className="w-6 h-6" />
                        </button>
                        <button
                            className="p-3 bg-zinc-900 dark:bg-neutral-100 rounded-full text-white dark:text-black"
                            onClick={(e) => {
                                clearSelectedTasks();
                            }}
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </>
                ) : (
                    <button
                        className="p-3 bg-slate-blue rounded-full text-white"
                        onClick={(e) => {
                            setShowAddForm(true);
                        }}
                    >
                        <PlusIcon className="w-6 h-6" />
                    </button>
                )}
            </div>
        </>
    );
}
