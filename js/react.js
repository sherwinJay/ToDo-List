class Form extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			toDoItem : ""
		}
		this.addToDo = this.addToDo.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render(){
		return(
			<form className="commentForm"onSubmit={this.handleSubmit}>
				<input type="text"
								value={this.state.toDoItem}
								onChange={this.addToDo} required/>
				<input type="Submit"/>
			</form>
		);
	}
	//Custom Methods
	addToDo(e){
		this.setState({
			toDoItem: e.target.value
		})
	}
	handleSubmit(e){
		this.props.addNew(this.state.toDoItem);

		this.setState({
			toDoItem: ""
		})
			e.preventDefault();
		//alert(this.state.toDoItem);
	}
}


class ToDo extends React.Component{
	render(){
		return(
			<li className="listItem">
				<div className="title">{this.props.title}</div>
				<div className="btn">
					<a href="#" onClick={this.handleDelete.bind(this)} className="deleteBtn" ></a>
				</div>
			</li>
		)
	}
	handleDelete(e){
		e.preventDefault();
		this.props.onDelete(this.props.id);
		//alert(this.props.id);
	}

}

class ToDoLists extends React.Component{
	render(){
		return(
			<ul>
				{this.props.toDoItem.map(  (item) => 
					
					<ToDo title={item.title}
								id={item.id}
								onDelete={this.deleteCallBack.bind(this)}
								/>
					
				)}
			</ul>
		);
	}
deleteCallBack(item){
		this.props.deleteItem(item);
	}
}





class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			toDoItems : []
		}
		this.addItem = this.addItem.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}
	componentDidMount(){
	//	this.fetchComments();

		this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
	}
	//
	componentWillUnmount() {
		window.removeEventListener(
		  "beforeunload",
		  this.saveStateToLocalStorage.bind(this)
		);
	
		// saves if component has a chance to unmount
		this.saveStateToLocalStorage();
	}
	hydrateStateWithLocalStorage() {
		// for all items in state
		for (let key in this.state) {
		  // if the key exists in localStorage
		  if (localStorage.hasOwnProperty(key)) {
			// get the key's value from localStorage
			let value = localStorage.getItem(key);
	
			// parse the localStorage string and setState
			try {
			  value = JSON.parse(value);
			  this.setState({ [key]: value });
			} catch (e) {
			  // handle empty string
			  this.setState({ [key]: value });
			}
		  }
		}
	  }
	
	  saveStateToLocalStorage() {
		// for every item in React state
		for (let key in this.state) {
		  // save to localStorage
		  localStorage.setItem(key, JSON.stringify(this.state[key]));
		}
	  }
	render(){
		console.log(this.state.toDoItems);
		return(
			<div className="main">
				<Form addNew={this.addItem}/>
				<ToDoLists toDoItem={this.state.toDoItems} deleteItem={this.handleDelete} />
				
			</div>
			
		);
	}

	
	//Custom Methods

	updateInput(key, value) {
		// update react state
		this.setState({ [key]: value });
	}

	addItem(title, id){
		const toDo = {
			title: title,
			id: 1 + Math.random(),
		}
		this.setState((state) => ({
			toDoItems: state.toDoItems.concat([toDo])
		}) )

		//localStorage.setItem("toDoItems",JSON.stringify(toDo));

	}

	fetchComments(){
		$.ajax({
			method: 'GET',
			url: 'toDoList.json',
			success: (toDoItems) => {
				this.setState({toDoItems})
			}

		});
	}

	handleDelete(commentID){
	//e.preventDefault();
		const list = [...this.state.toDoItems];


		const toDoItem = list.filter(
			toDo => toDo.id !== commentID
		);

		this.setState({ toDoItems: toDoItem });
	}
}

ReactDOM.render(<App  />, document.getElementById("main"), console.timeEnd("app"));	


