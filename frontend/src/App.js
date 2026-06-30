import React, { useState , useEffect } from 'react';
import axios from 'axios';


function App(){
	const [tasks , setTasks] = useState([]);
	const [title, setTitle] = useState("");
	
	const addTask = async ()=>{
		await axios.post(`http://localhost:5000/api/tasks`,{ title });
		setTitle("");
		fetchTasks();
	}

	const toggleTask = async(task) =>{
		await axios.put(`http://localhost:5000/api/tasks/${task._id}`,{
			completed: !task.completed				
		});
		fetchTasks();
	}
	
	const deleteTask = async(id) =>{
		await axios.delete(`http://localhost:5000/api/tasks/${id}`);
		fetchTasks();
	}

	const fetchTasks = async()=>{
		const res = await axios.get(`http://localhost:5000/api/tasks`);
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
				}
			</ul>
		</div>
	);	
}

export default App;
