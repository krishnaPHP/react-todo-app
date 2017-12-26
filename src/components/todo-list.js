import React, {Component} from 'react';
import _ from "lodash";
import TodoListItem from "./todo-list-item";

export default class TodoList extends Component {

    renderItems() {
        const props = _.omit(this.props, 'todos');
        return _.map(this.props.todos, (todo, index) => <TodoListItem key={index} {...todo} {...props} />);
    }

    render() {
        return (
            <div className="list-container">
                <ul>
                    {this.renderItems()}
                </ul>
            </div>
        );
    }
}