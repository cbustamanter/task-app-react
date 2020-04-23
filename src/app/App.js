import React, { Component } from 'react';
import Navbar from '../app/components/navbar';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: []
        }
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getTasks();
    }

    addTask(e) {
        fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json(res))
            .then(data => {
                console.log(data);
                M.toast({ html: 'Task Saved' });
                this.setState({ title: '', description: '' });
                this.getTasks();
            })
            .catch(err => console.log(err));

        e.preventDefault();
    }

    getTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks: data })
            });
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    deleteTask(id) {
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.getTasks();
        });
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} className="materialize-textarea" placeholder="Task Description" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button className="btn green darken-1" type="submit">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn red darken-1" onClick={() => this.deleteTask(task._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className="btn amber lighten-2">
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;