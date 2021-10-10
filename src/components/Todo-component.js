import React from 'react';

class TodoForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			textInput: '', 
			todos:[]
		};
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addTodo = this.addTodo.bind(this);
		this.showTodos = this.showTodos.bind(this);
		this.importedTodos = '';
	}

	async showTodos (){
		let todosArray = await fetch('http://localhost:3004/todos');
		let fetchedTodos = await todosArray.json();
		console.log(fetchedTodos);
		this.state.todos.push(fetchedTodos.map((item) => item.title))
		console.log('todos in state', this.state.todos);


		// this.setState({todos: this.state.todos.push(fetchedTodos.map((item) => item.title))})
		// console.log('check', this.state.todos);
		// this.importedTodos = this.state.todos;

		//this.state.todos.map((item)=> <li>{item}</li>)

		// this.importedTodos = this.importedTodos + this.state.todos.map(item => <li>{item.title}</li>)

		// this.setState({todos: this.state.todos.push(fetchedTodos.map((item) => {
		// return <li>{item}</li>
		// }))});
   }

	handleInput(event){
		event.preventDefault();
		this.setState({textInput: event.target.value});
		
	}

	async addTodo(post){
		let link = await fetch('http://localhost:3004/todos', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(post)
		});

		let response = await link.json();
		//let li = response.title;
			
		console.log(response.title, 'show');
	}

	async handleSubmit(event){
		event.preventDefault();
		console.log('check', this.state.textInput);
		let post = {
			"title": this.state.textInput,
			"completed": false
		}
		this.addTodo(post);
		this.showTodos();
	}
	
	render(){
		return (
			<div>
				<ol>{this.state.todos.map((item) => <li>{item}</li>)}</ol>

				<form onSubmit={this.handleSubmit}>
					<input type="text" value = {this.state.textInput} onChange = {this.handleInput} placeholder="Enter a new point in to-do list"/>
					<br/>
					<button type = "submit">Add point</button>
				</form>
			</div>
		)
	}
}

export default TodoForm;

