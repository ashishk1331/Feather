import Home from './screens/Home'
import Form from './screens/Form'
import Splash from './screens/Splash'
import TagEditor from './screens/TagEditor'
import { PlusSmallIcon, TrashIcon, PencilIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/solid'
import { getItem, setItem, removeItem } from './util/useStorage'
import { useState, useEffect, useReducer } from 'react'

export default function App(props){

    const initialState = {
        tasks: getItem('tasks').filter(i => i.id !== undefined) || [],
        activeTasks: [],
        completedTasks: getItem('completed') || [],
        selectedTasks: [],
        tags: getItem('tags'),
        daysName: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        today: new Date().getDay()
    }

    function reducer(prev, action){
        let obj = {...prev}
        let newList = []
        switch(action.type){
            case 'ADD_TASK':
                newList = [action.value, ...prev.tasks]
                obj.tasks = newList

                if(action.value.days.includes(prev.daysName[prev.today])){
                    obj.activeTasks = [action.value , ...prev.activeTasks]
                }

                removeItem('tasks', newList)
                break

            case 'DELETE_TASK':
                if(prev.selectedTasks.length > 0){

                    let s = new Set(prev.selectedTasks)

                    obj.completedTasks = prev.completedTasks.filter(i => !s.has(i))
                    removeItem('completed', obj.completedTasks)

                    obj.activeTasks = prev.activeTasks.filter(i => !s.has(i.id))

                    newList = prev.tasks.filter(i => !s.has(i.id))
                    obj.tasks = newList
                    removeItem('tasks', [...newList])

                    obj.selectedTasks = []
                }
                break

            case 'LIKE_TASK':
                newList = prev.tasks.map(i => {
                    if(prev.selectedTasks.includes(i.id)){
                        console.log(prev.selectedTasks)
                        if(i.liked === undefined){
                            i.liked = true
                        } else{
                            i.liked = !i.liked
                        }
                    }
                    return i
                })
                obj.tasks = newList
                removeItem('tasks', newList)
                break

            case 'SET_TASK_DONE':
                if(prev.completedTasks.includes(action.value)){
                    obj.completedTasks = prev.completedTasks.filter(i => i !== action.value)
                } else{
                    obj.completedTasks = [action.value, ...prev.completedTasks]
                }
                removeItem('completed', obj.completedTasks)
                break

            case 'SET_ACTIVE_TASKS':
                let today = prev.daysName[new Date().getDay()]
                obj.activeTasks = prev.tasks.filter(i => i.days.includes(today))
                break

            case 'RESET_COMPLETED_TASKS':
                obj.completedTasks = []
                break

            case 'ADD_TAG':
                newList = [action.value, ...prev.tags]
                obj.tags = newList
                removeItem('tags', newList)
                break

            case 'REMOVE_TAG':
                newList = prev.tags.filter(i => i !== action.value)
                obj.tags = newList
                removeItem('tags', newList)
                break

            case 'SELECT_TASK':
                if(prev.selectedTasks.includes(action.value)){
                    obj.selectedTasks = prev.selectedTasks.filter(i => i !== action.value)
                } else {
                    obj.selectedTasks = [action.value, ...prev.selectedTasks]
                }
                break

            case 'DESELECT_TASKS':
                obj.selectedTasks = []
                break
                
            default:
                throw new Error('Invalid choice.')

        }
        return obj
    }

    const [ state, dispatch ] = useReducer(reducer, initialState)

    const [ showAddForm, setShowAddForm ] = useState(false);
    const [ showTagEditor, setShowTagEditor ] = useState(false)

    useEffect(() => {

        let t = new Date(getItem('date')[0])
        let n = new Date()
        
        if((t.getDay() !== n.getDay()) || (Math.round((n.getTime() - t.getTime())/1000) > 86400)){
            dispatch({
                type: 'RESET_COMPLETED_TASKS'
            })
            removeItem('date', [n])
        }

        dispatch({
            type: 'SET_ACTIVE_TASKS'
        })
    }, [])

    return (
        <>
            {/*<Splash />*/}
            <Home 
                state={state}
                dispatch={dispatch}

                setShowAddForm = {setShowAddForm}
                setShowTagEditor={setShowTagEditor}
            />
            {
                showAddForm && <Form state={state} dispatch={dispatch} setShowAddForm={setShowAddForm} />
            }
            {
                showTagEditor && <TagEditor state={state} dispatch={dispatch} setShowTagEditor={setShowTagEditor} />
            }
            <div className="fixed bottom-0 right-0 m-6 flex items-center gap-2">
            {
                state.selectedTasks.length > 0 ?
                <>
                    <button
                        className="p-4 bg-red-500 rounded-full text-white"
                        onClick={(e) => {
                            dispatch({
                                type: 'DELETE_TASK'
                            })
                        }}
                    >
                            <TrashIcon className="w-5 h-5" />
                    </button>
                    <button
                        className="p-4 bg-black dark:bg-neutral-100 rounded-full text-white dark:text-black"
                        onClick={(e) => {
                            dispatch({
                                type: 'LIKE_TASK'
                            })
                        }}
                    >
                            <HeartIcon className="w-5 h-5" />
                    </button>
                    <button
                        className="p-4 bg-black dark:bg-neutral-100 rounded-full text-white dark:text-black"
                        onClick={(e) => {
                            dispatch({
                                type: 'DESELECT_TASKS'
                            })
                        }}
                    >
                            <XMarkIcon className="w-5 h-5" />
                    </button>
                </>
                :
                <button
                    className="p-4 bg-black rounded-full dark:bg-neutral-100 text-white dark:text-black"
                    onClick={(e) => {
                        setShowAddForm(true)
                    }}
                >
                        <PlusIcon className="w-5 h-5" />
                </button>
            }
            </div>
        </>
    )
}