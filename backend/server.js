const express = require('express');
const cors=require('cors');
const mongoose=require('mongoose');

require('dotenv').config();

const app=express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const uri= process.env.ATLAS_URI;
mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.log("MongoDB connection error:", err));
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
})

const todosRouter=require('./routes/todos');
const usersRouter=require('./routes/users');

app.use('/todos',todosRouter);
app.use('/users',usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});