import React, { useState , useEffect } from 'react';
import api from "./api";  


function App(){
	const [tasks , setTasks] = useState([]);
	const [title, setTitle] = useState("");
	
	const addTask = async ()=>{
		await api.post(`/`,{ title });
		setTitle("");
		fetchTasks();
	}

	const toggleTask = async(task) =>{
		await api.put(`/${task._id}`,{
			completed: !task.completed				
		});
		fetchTasks();
	}
	
	const deleteTask = async(id) =>{
		await api.delete(`/${id}`);
		fetchTasks();
	}

	const fetchTasks = async()=>{
		const res = await api.get(`/`);
		setTasks(res.data);
	}
	
	useEffect(()=>{
		fetchTasks();
	},[])
	
	return(
		<div style={{padding: "20px"}}>
			<h2>Task Manager</h2>
			<input value={title} onChange={(e)=>{setTitle(e.target.value);}} placeholder="Enter Title" />
			<button onClick={addTask}>Add</button>
			<ul>
				{
					Array.isArray(tasks) ? (
						tasks.map(task => (
							<li key={task._id}>
								<span onClick={()=>toggleTask(task)} style={{ 
									textDecoration : task.completed ? "line-through" : "none",
									cursor: "pointer"
							}}>
									{task.title}
								</span>&nbsp;
								<button onClick={()=>deleteTask(task._id)}>X</button>
							</li>	
						))
					) : ( <p>No tasks found</p> )
				}
			</ul>
		</div>
	);	
}

export default App;
