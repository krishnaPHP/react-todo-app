import React, {Component} from 'react';

export default class TodoListItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        }
    }

    toggleTask(task) {
        if (this.state.isEditing)
            return;

        this.props.toggleTask(task);
    }

    onEditClick(event) {
        event.stopPropagation();
        this.setState({isEditing: true});
    }

    onCancelClick() {
        event.stopPropagation();
        this.setState({isEditing: false});
    }

    onSaveClick(event) {
        event.stopPropagation();
        event.preventDefault();

        let editTaskInput = this.refs.editTaskInput;
        if (editTaskInput.value === null || editTaskInput.value === "")
            return;

        this.props.saveTask(this.props.task, editTaskInput.value);
        this.setState({isEditing: false});
    }

    onDeleteClick(event) {
        event.stopPropagation();
        this.props.deleteTask(this.props.task);
    }

    renderTaskSection() {
        if (this.state.isEditing) {
            return (
                <form onSubmit={this.onSaveClick.bind(this)}>
                    <input type="text" ref="editTaskInput" defaultValue={this.props.task}/>
                </form>
            );
        }
        return this.props.task;
    }

    renderActionSection() {
        if (this.state.isEditing) {
            return (
                <span className="btn-section">
                    <button className="btn" onClick={this.onSaveClick.bind(this)}>Save</button>
                    <button className="btn" onClick={this.onCancelClick.bind(this)}>Cancel</button>
                </span>
            );
        }

        return (
            <span className="btn-section">
                <button className="btn" onClick={this.onEditClick.bind(this)}>Edit</button>
                <button className="btn" onClick={this.onDeleteClick.bind(this)}>Delete</button>
            </span>
        );
    }

    render() {
        const {task, completed} = this.props;
        return (
            <li
                className={completed ? "checked" : ""}
                onClick={this.toggleTask.bind(this, task)}>{this.renderTaskSection()} {this.renderActionSection()} </li>
        );
    }
}