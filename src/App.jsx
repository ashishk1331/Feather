import Home from './screens/Home'
import Form from './screens/Form'
import { getItem, setItem, removeItem } from './util/useStorage'
import { useState } from 'react'

export default function App(props){

    const [ showAddForm, setShowAddForm ] = useState(0);
    const [ tasks, setTasks ] = useState(getItem('tasks').filter(i => i.id !== undefined))
    const [ selectedList, setSelectedList ] = useState([]);

    function deleteTasks(){
            console.log(selectedList)
        if(selectedList.size > 0){
            setTasks(tasks.filter(i => !selectedList.includes(i.id)))
            setSelectedList([])
        }
    }

    return (
        <>
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