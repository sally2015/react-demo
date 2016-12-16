import React from 'react';
import uuid from 'uuid';
import TodoAction from '../actions/TodoAction';
import TodoStore from '../stores/TodoStores';
import List from './List';
import CreateButton from './CreateButton';

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: TodoStore.getAll()
		};
		console.log(this.state)
		this.createTodo = this.createTodo.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.onChange = this.onChange.bind(this)
	}
	componentDidMount () {
		TodoStore.addChangeListener(this.onChange);
	}
	componentWillUnmount() {
		TodoStore.removeChangeListener(this.onChange);
	}
	createTodo () {
		TodoAction.create({ id: uuid.v4(), content: '3rd stuff' })
	}

	deleteTodo (id) {
		TodoAction.delete(id);
	}
	onChange () {
		this.setState({
			todos: TodoStore.getAll()
		})
	}

	render () {
		return (
			<div>
				<h1>今天的待办事项</h1>
				<List todos={this.state.todos} deleteTodo={this.deleteTodo}></List>
				<CreateButton onCreate={this.createTodo}></CreateButton>
			</div>
		)
	}

}

export default Todo;