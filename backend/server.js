const express = require('express');
const cors = require("cors");
const connectDB = require("./config/db")

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/tasks",require('./routes/taskRoutes'));

app.listen(5000,()=>{ console.log("server running on 5000 port")});