import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import './App.css';

import Navbar from "./components/navbar.component";
import TodoList from "./components/todo-list.component";
import EditTodo from "./components/edit-todo.component";
import CreateTodo from "./components/create-todo.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Routes>
          <Route path="/" element={<TodoList/>}/>
          <Route path="/edit/:id" element={<EditTodo/>}/>
          <Route path="/create" element={<CreateTodo/>}/>
          <Route path="/user" element={<CreateUser/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
