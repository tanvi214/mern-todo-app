import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
  <tr>
    <td>
      <input 
        type="checkbox" 
        checked={props.todos.completed}
        onChange={() => props.toggleComplete(props.todos._id, props.todos.completed)}
      />
    </td>
    <td style={{ textDecoration: props.todos.completed ? 'line-through' : 'none', color: props.todos.completed ? 'var(--muted)' : 'inherit' }}>
      {props.todos.description}
    </td>
    <td>{props.todos.username}</td>
    <td>{props.todos.description}</td>
    <td>{props.todos.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.todos._id}>edit</Link> | <a href="#" onClick={() => { props.deleteTodo(props.todos._id) }}>delete</a>
    </td>
  </tr>
)

export default class TodoList extends Component{
    constructor(props){
        super(props);

        this.toggleComplete = this.toggleComplete.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.state={todos: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/todos/')
        .then(response => {
            this.setState({todos:response.data})
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    deleteTodo(id){
        axios.delete('http://localhost:5000/todos/'+id)
        .then(res=>console.log(res.data));
        this.setState({
            todos: this.state.todos.filter(el => el._id !==id)
        })
    }

    toggleComplete(id, currentStatus) {
    axios.get('http://localhost:5000/todos/' + id)
        .then(response => {
            const todo = response.data;
            axios.post('http://localhost:5000/todos/update/' + id, {
                username: todo.username,
                description: todo.description,
                date: todo.date,
                completed: !currentStatus
            })
            .then(res => {
                this.setState({
                    todos: this.state.todos.map(todo =>
                        todo._id === id ? { ...todo, completed: !currentStatus } : todo
                    )
                });
            });
        })
        .catch(err => console.log(err));
    }

    todoList() {
        return this.state.todos.map(currentTodo => {
        return <Todo todos={currentTodo} deleteTodo={this.deleteTodo} toggleComplete={this.toggleComplete} key={currentTodo._id}/>;
        })
    }


    render(){
        return(
            <div>
        <h3>To-do List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Done</th>
              <th>Username</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.todoList() }
          </tbody>
        </table>
      </div>
        )
    }
}