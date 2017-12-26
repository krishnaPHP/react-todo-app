import React, {Component} from 'react';

import '../styles/app.css';

class TodoNew extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        event.preventDefault();

        let taskInput = this.refs.taskInput;
        if (taskInput.value === null || taskInput.value === "")
            return;

        this.props.addTask(taskInput.value);
        taskInput.value = "";
    }

    render() {
        return (
            <div className="header">
                <h1>My Todos</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" ref="taskInput" placeholder="Add Task..."/>
                    <input type="submit" hidden/>
                </form>
            </div>
        );
    }
}

export default TodoNew;