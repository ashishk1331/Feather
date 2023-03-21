import Home from './screens/Home'
import Form from './screens/Form'
import Splash from './screens/Splash'
import { getItem, setItem, removeItem } from './util/useStorage'
import { useState, useEffect } from 'react'

export default function App(props){

    const [ showAddForm, setShowAddForm ] = useState(0);
    const [ tasks, setTasks ] = useState(getItem('tasks').filter(i => i.id !== undefined))
    const [ selectedList, setSelectedList ] = useState([]);
    const [ completedTasks, setCompletedTasks ] = useState(getItem('completed'))

    function deleteTasks(){
        if(selectedList.length > 0){
            let s = new Set(selectedList)

            // compute completed list
            let c = completedTasks.filter(i => !s.has(i))
            setCompletedTasks(c)
            removeItem('completed', [...c])

            // compute new tasks
            let newList = tasks.filter(i => !s.has(i.id))
            setTasks(newList)

            removeItem('tasks', newList)
            setSelectedList([])
        }
    }

    useEffect(() => {
        let t = new Date(getItem('date')[0])
        let n = new Date()
        
        if((t.getDay() !== n.getDay()) || (Math.round((n.getTime() - t.getTime())/1000) > 86400)){
            setCompletedTasks([])
            removeItem('date', [n])
        }
    }, [])

    return (
        <>
            <Splash />
            <Home 
                tasks={tasks}
                setShowAddForm = {setShowAddForm}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
                deleteTasks={deleteTasks}
                completedTasks={completedTasks}
                setCompletedTasks={setCompletedTasks}
            />
            {
                showAddForm === 1 && <Form tasks={tasks} setTasks={setTasks} setShowAddForm={setShowAddForm} />
            }
        </>
    )
}