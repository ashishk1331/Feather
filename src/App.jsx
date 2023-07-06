import { format, isPast } from "date-fns";
import Home from "./screens/Home";
import Form from "./screens/Form";
import Splash from "./screens/Splash";
import TagEditor from "./screens/TagEditor";
import {
    PlusSmallIcon,
    TrashIcon,
    PencilIcon,
    XMarkIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { getItem, setItem, removeItem } from "./util/useStorage";
import { useState, useEffect, useReducer } from "react";
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

    const initialState = {
        tasks: getItem("tasks").filter((i) => i.id !== undefined) || [],
        activeTasks: [],
        completedTasks: getItem("completed") || [],
        selectedTasks: [],
        tags: getItem("tags"),
        daysName: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
        today: new Date().getDay(),
    };

    function reducer(prev, action) {
        let obj = { ...prev };
        let newList = [];
        switch (action.type) {
            case "ADD_TASK":
                newList = [action.value, ...prev.tasks];
                obj.tasks = newList;

                if (action.value.days.includes(prev.daysName[prev.today])) {
                    obj.activeTasks = [action.value, ...prev.activeTasks];
                }

                removeItem("tasks", newList);
                break;

            case "DELETE_TASK":
                if (prev.selectedTasks.length > 0) {
                    let s = new Set(prev.selectedTasks);

                    obj.completedTasks = prev.completedTasks.filter(
                        (i) => !s.has(i)
                    );
                    removeItem("completed", obj.completedTasks);

                    obj.activeTasks = prev.activeTasks.filter(
                        (i) => !s.has(i.id)
                    );

                    newList = prev.tasks.filter((i) => !s.has(i.id));
                    obj.tasks = newList;
                    removeItem("tasks", [...newList]);

                    obj.selectedTasks = [];
                }
                break;

            case "LIKE_TASK":
                newList = prev.tasks.map((i) => {
                    if (prev.selectedTasks.includes(i.id)) {
                        if (i.liked === undefined) {
                            i.liked = true;
                        } else {
                            i.liked = !i.liked;
                        }
                    }
                    return i;
                });
                obj.tasks = newList;
                removeItem("tasks", newList);
                break;

            case "SET_TASK_DONE":
                if (prev.completedTasks.includes(action.value)) {
                    obj.completedTasks = prev.completedTasks.filter(
                        (i) => i !== action.value
                    );
                } else {
                    obj.completedTasks = [action.value, ...prev.completedTasks];
                }
                removeItem("completed", obj.completedTasks);
                break;

            case "SET_ACTIVE_TASKS":
                let today = prev.daysName[new Date().getDay()];
                if (prev.tasks.length > 0) {
                    obj.activeTasks = prev.tasks.filter(
                        (i) => i.occurrance && i.occurrance.includes(today)
                    );
                }
                break;

            case "RESET_COMPLETED_TASKS":
                obj.completedTasks = [];
                break;

            case "ADD_TAG":
                newList = [action.value, ...prev.tags];
                obj.tags = newList;
                removeItem("tags", newList);
                break;

            case "REMOVE_TAG":
                newList = prev.tags.filter((i) => i !== action.value);
                obj.tags = newList;
                removeItem("tags", newList);
                break;

            case "SELECT_TASK":
                if (prev.selectedTasks.includes(action.value)) {
                    obj.selectedTasks = prev.selectedTasks.filter(
                        (i) => i !== action.value
                    );
                } else {
                    obj.selectedTasks = [action.value, ...prev.selectedTasks];
                }
                break;

            case "DESELECT_TASKS":
                obj.selectedTasks = [];
                break;

            default:
                throw new Error("Invalid choice.");
        }
        return obj;
    }

    const [state, dispatch] = useReducer(reducer, initialState);

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
            {showTagEditor && <TagEditor setShowTagEditor={setShowTagEditor} />}
            <div className="fixed bottom-0 right-0 m-6 flex items-center gap-2">
                {selectedTasks.length > 0 ? (
                    <>
                        <button
                            className="p-4 bg-red-500 rounded-full text-white"
                            onClick={(e) => {
                                selectedTasks.forEach((task) =>
                                    removeTask(task)
                                );
                            }}
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                        <button
                            className="p-4 bg-black dark:bg-neutral-100 rounded-full text-white dark:text-black"
                            onClick={(e) => {
                                selectedTasks.forEach((task_id) => {
                                    likeTask(task_id);
                                });
                            }}
                        >
                            <HeartIcon className="w-5 h-5" />
                        </button>
                        <button
                            className="p-4 bg-black dark:bg-neutral-100 rounded-full text-white dark:text-black"
                            onClick={(e) => {
                                clearSelectedTasks();
                            }}
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </>
                ) : (
                    <button
                        className="p-4 bg-black rounded-full dark:bg-neutral-100 text-white dark:text-black"
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
