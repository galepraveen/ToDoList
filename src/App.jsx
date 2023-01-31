import React, { useState, useRef } from 'react';
import close from './close_icon.png';
import done from './done_icon.png';

const App = () => {
  const [list, setList] = useState([]);
  const [task, setTask] = useState('');

  const inputElement = useRef();

  const handleChange = (e)=>{
    setTask(e.target.value);
  }

  const addTask = ()=>{
    const newTask = {
      id: list.length === 0 ? 1 : list[list.length - 1].id + 1,
      taskName: task,
      completed: false
    }
    setList([...list, newTask]);
    inputElement.current.value = '';

    console.log(list);
  }

  const deleteTask = (id)=>{
    setList(list.filter(item => item.id !== id))
  }

 const doneTask = (id)=>{
    setList(
      list.map(item => {
        if(item.id === id){
          return { ...item, completed: true };
        }else{
          return { ...item };
        }
      })
    )
 }

  return (
    <>
      <div className="upper bg-purple-500 grid place-items-center py-[3rem] text-center">
          <h1 className='text-[2rem] font-semibold text-white '> My To Do List </h1>
          <div className='flex flex-1 w-[60%] py-[1rem] justify-between'>
            <div className='input border-4 w-[75%]'>
              <input type="text" name="text" placeholder='Title...' className='inline-block w-full p-[0.5rem] outline-none border-none' autoComplete='off' onChange={handleChange} ref={inputElement} />
            </div>
            <button className="button border w-[25%] text-center bg-blue-400 text-white cursor-pointer" onClick={addTask}> Add </button>
          </div>
      </div>

      <div className="lower grid place-items-center mt-5">
        {
          list.map(item => (
            <div className={`bg-cyan-200 border-black w-[80%] p-4 flex justify-between my-[1rem] hover:bg-cyan-400`} key={item.id}>
              <h1 className={`uppercase font-semibold cursor-pointer grow decoration-[#fff] ${item.completed && 'line-through'}`}> {item.taskName} </h1>
              <button onClick={() => doneTask(item.id)} className={`mr-[3rem]`}>
                <img src={done} alt="done-icon" className='w-[1.5rem]'/>
              </button>
              <button onClick={() => deleteTask(item.id)}>
                <img src={close} alt="close-icon" className='w-[1.5rem]'/>
              </button> 
            </div>
          ))
        }
      </div>

    </>
  )
}

export default App
