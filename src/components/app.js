import React from 'react';

import TodoNew from './todo-new';
import TodoList from "./todo-list";

import '../styles/app.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {todos: []};
    }

    componentWillMount() {
        localStorage.getItem('todos') && this.setState({
            todos: JSON.parse(localStorage.getItem('todos')),
        });
    }

    componentDidMount() {
        if (!localStorage.getItem('todos'))
            localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('todos', JSON.stringify(nextState.todos));
    }

    addTask(task) {
        this.state.todos.push({
            task,
            completed: false
        });
        this.setState({todos: this.state.todos});
        //localStorage.setItem('todos', JSON.stringify(this.state.todos));

    }

    toggleTask(task) {
        let foundTodo = _.find(this.state.todos, (todo) => todo.task === task);
        foundTodo.completed = !foundTodo.completed;

        this.setState({todos: this.state.todos});
    }

    saveTask(oldTask, newTask) {
        let foundTodo = _.find(this.state.todos, (todo) => todo.task === oldTask);
        foundTodo.task = newTask;

        this.setState({todos: this.state.todos});
    }

    deleteTask(task) {
        _.remove(this.state.todos, todo => todo.task === task);
        this.setState({todos: this.state.todos});
    }

    render() {
        return (
            <div className="container">
                <TodoNew addTask={this.addTask.bind(this)}/>
                <TodoList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />
            </div>
        );
    }
}