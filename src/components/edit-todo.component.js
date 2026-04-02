import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';

const EditTodo = () => {
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/todos/' + id)
            .then(response => {
                setUsername(response.data.username);
                setDescription(response.data.description);
                setDate(new Date(response.data.date));
            })
            .catch(error => console.log(error));

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username));
                }
            });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const todo = { username, description, date };
        console.log(todo);
        axios.post('http://localhost:5000/todos/update/' + id, todo)
            .then(res => console.log(res.data));
        window.location = '/';
    }

    return (
        <div>
            <h3>Edit Todo</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select required className="form-control" value={username} onChange={e => setUsername(e.target.value)}>
                        {users.map(user => <option key={user} value={user}>{user}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text" required className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker selected={date} onChange={date => setDate(date)} />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Finish" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default EditTodo;