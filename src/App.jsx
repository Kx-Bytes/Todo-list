import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from "./components/navbar"
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(() => {
    const savedTask = localStorage.getItem("todos");
    return savedTask ? JSON.parse(savedTask) : []
  })

  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id
    });
    setTodos(newTodos)


  }

  const handleAdd = (event) => {
    
    event.preventDefault();
    const newTodo = [...todos, { id: uuidv4(), todo: todo, isCompleted: false }]
    setTodos(newTodo)
    setTodo("")

  }

  const handleChange = (e) => {
    setTodo(e.target.value)

  }

  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)

  }


  const toggleFinished=(e)=>{
    setshowFinished(!showFinished);
  }

  const check=()=>{
    if(todo.length<3){
      alert("vnekj");
    
    }
    console.log("i WAS HER")
  }

  return (
    <>
      <Navbar />
      <div className='flex justify-center my-2 '>

        <div className='min-h-[80vh] bg-blue-50 w-5/12 rounded-xl flex flex-col '>
          <div className='font-bold py-5 text-2xl mx-auto'>iTask - Manage your todos at one place</div>

          <div className='px-5 font-bold '>Add a Todo</div>

          <form onSubmit={handleAdd}>

            <div className='flex'>

              <input onChange={handleChange}  value={todo} type="text" className='w-10/12 rounded-xl ml-3 mt-3' />
              <button id="" onClick={handleAdd} disabled={todo.length<2}  type='submit' className=" bg-indigo-500 w-20 mx-3 rounded-2xl mt-3 text-white h-8 hover:font-bold hover:bg-indigo-700 disabled:bg-indigo-300 ">Save</button>
            </div>

          </form>


          <div>
            <input onChange={toggleFinished} type="checkbox" checked={showFinished} id="hey" className="text-sm ml-3 mt-6" />
            <label htmlFor="hey" className='text-[13px] text-gray-500 ml-2'>Show Finished</label>
          </div>
          <div className=' border-stone-300 border-[1px]  mx-9 my-3'></div>

          {todos.length === 0 && <div className='mx-4 my-2 text-sky-800 text-[12px]'>****No Todos added***</div>}
          {todos.map((item) => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
              <div className='flex gap-5 relative '>
                <input className="ml-3 top-[6px] absolute" name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={`${item.isCompleted ? "line-through" : ""} ml-10`}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 max-h-[30px]'> <FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 max-h-[30px]'><MdDelete /></button>
              </div>
            </div>
           

          })}
        </div>
      </div>

    </>
  )
}

export default App
