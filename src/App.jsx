import Home from './screens/Home'
import Form from './screens/Form'
import Splash from './screens/Splash'
import TagEditor from './screens/TagEditor'
import { getItem, setItem, removeItem } from './util/useStorage'
import { useState, useEffect } from 'react'

export default function App(props){

    const [ showAddForm, setShowAddForm ] = useState(false);
    const [ showTagEditor, setShowTagEditor ] = useState(false)
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

    function likeTasks(){
        if(selectedList.length > 0){
            let s = new Set(selectedList)

            let newList = tasks.map(i => {
                if(s.has(i.id)){
                    if(i.liked === undefined){
                        i.liked = true
                    } else{
                        i.liked = !i.liked
                    }
                }
                return i
            })

            removeItem('tasks', newList)
            setTasks(newList)
        }
    }

    function deSelect(){
        if(selectedList.length > 0){
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
                setShowTagEditor={setShowTagEditor}
                likeTasks={likeTasks}
                deSelect={deSelect}
            />
            {
                showAddForm && <Form tasks={tasks} setTasks={setTasks} setShowAddForm={setShowAddForm} />
            }
            {
                showTagEditor && <TagEditor setShowTagEditor={setShowTagEditor} />
            }
        </>
    )
}