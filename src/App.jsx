import Home from './screens/Home'
import Form from './screens/Form'
import Splash from './screens/Splash'
import { getItem, setItem, removeItem } from './util/useStorage'
import { useState, useEffect } from 'react'

export default function App(props){

    const [ showAddForm, setShowAddForm ] = useState(0);
    const [ tasks, setTasks ] = useState(getItem('tasks').filter(i => i.id !== undefined))
    const [ selectedList, setSelectedList ] = useState([]);

    function deleteTasks(){
        if(selectedList.length > 0){
            let newList = tasks.filter(i => !selectedList.includes(i.id))
            setTasks(newList)
            removeItem('tasks', newList)
            setSelectedList([])
        }
    }

    return (
        <>
            <Splash />
            <Home 
                tasks={tasks}
                setShowAddForm = {setShowAddForm}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
                deleteTasks={deleteTasks}
            />
            {
                showAddForm === 1 && <Form tasks={tasks} setTasks={setTasks} setShowAddForm={setShowAddForm} />
            }
        </>
    )
}