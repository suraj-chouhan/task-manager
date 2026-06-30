const Task = require('../models/Task');
const mongoose = require('mongoose');

exports.getTasks = async (req,res) => {
	try{
		const tasks = await Task.find();
		res.json(tasks);
	}catch(error){
		res.status(500).json({error:error.message});	
	}	
}

exports.createTask = async (req,res) =>{
		try{
			 if(!req.body.title || req.body.title === "")
			 {
			  	res.status(400).json({ message: "The title is required"});
			 }
			 const newTask = new Task({ title:req.body.title });
			 await newTask.save();
			 res.status(201).json(newTask)
		}catch(error){
			res.status(500).json({error:error.message});
		}
}

exports.updateTask = async (req,res) =>{
	try{
		 const { id } = req.params;
		 if(!mongoose.Types.ObjectId.isValid(id))
		 {
			return res.status(400).json({ error: "Invalid task id"});	 
		 }
		 const updatedTask = await Task.findByIdAndUpdate(
			id,
			req.body,
			{ new:true }
		 );
		 if(!updatedTask)
		 {
		  	return res.status(404).json({ error: "Task not found"});	 
		 }
		 res.json(updatedTask)
	}catch(error){
		res.status(500).json({ error: error.message });
	}
}

exports.deleteTask = async (req,res) =>{
	try{
		const { id } = req.params;
		if(!mongoose.Types.ObjectId.isValid(id))
		{
			return res.status(400).json({ message:"Invalid task id" });	
		}
		const deletedTask = await Task.findByIdAndDelete(req.params.id);
		if(!deletedTask)
		{
			return res.status(404).json({ error:"Task not found" });	
		}
		res.json({ message:"Deleted Successfully" });
	}catch(error){
		res.status(500).json({ error: error.message });
	}
}