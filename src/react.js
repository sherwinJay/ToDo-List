class AddListForm extends React.Component{
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
			<form onSubmit={this.handleSubmit}>
				<input type="text" value={this.state.toDoItem} onChange={this.addToDo}/>
				<button>Submit</button>
			</form>
		);
	}

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

class TodoListItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			editTask: false,
			toDoItem : "",
			showTaskMenu: false
		}
		//this.handleEdit = this.handleEdit.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.editList = this.editList.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.taskMenu = this.taskMenu.bind(this);
	}

	onDelete(e){
		e.preventDefault();
		this.props.deleteItem(this.props.oldId);
		}
		editList(e){
			let {value} = e.target
			this.setState({
				toDoItem: value
			})
		}
		onEdit(e){
			e.preventDefault();
			this.setState({editTask: !this.state.editTask});
		}
		handleSubmit(e){
				
			this.props.editItem(this.state.toDoItem, this.props.oldId);
			this.setState({
				toDoItem: "",
				editTask: false
			})
					
			e.preventDefault();
			//alert(this.state.toDoItem);
		}
		taskMenu(e){
			e.preventDefault();
			//console.log("works");
			this.props.activeList(this.props.idx);
			//this.setState({showTaskMenu: !this.state.showTaskMenu});
		}
	render(){
		/*******************
		FIX THIS LINES LATER | MAKE TASK MENU A CHILD COMPONENT??? 
		********************/
		let showTask;
		console.log(this.state.toDoItem);
		
		if(this.props.active){
			showTask = { display: "block"}
		}else{
		showTask = { display: "none"}
		}
		/*******************
		FIX THIS LINES LATER
		********************/
		return(
			<div>
				{	this.state.editTask ? 
					(
						<li className="listItem" >
							<form onSubmit={this.handleSubmit}>
								<input type="text" value={this.state.toDoItem} onChange={this.editList}/>
								<button>Submit</button>
							</form> |  
							<a href="#" onClick={this.onEdit}>Cancel</a>
						</li>
					)
					:
					(
						<li className="listItem" >{this.props.title} | 
							<form><label><img src="images/calendar.png"/></label></form> {this.props.date} | 
							
								<a href="#" onClick={this.taskMenu} className="showTaskButton">
								</a>
								<div  style={showTask} className="taskMenu">
									<a href="#" onClick={this.props.delete}>Edit</a>
									<a href="#" onClick={this.props.edit}>Delete</a>
								</div>
							
						</li>
						
					)
				}
			</div>
		)
	}

}
class TodoList extends React.Component{
	constructor(props){
		super(props);
		this.state={
			activeIdx: -1

		}
		this.activeList = this.activeList.bind(this);
	}
	activeList(idx){
		this.setState({activeIdx: idx});
	}
	deleteCallBack(item){
		this.props.deleteItem(item);
	}	
	editCallBack(item, i){
		this.props.editItem(item, i);
	}

	render(){
		return(
		<ul>
			{
				this.props.todoList.map( (item, idx) => 
				<TodoListItem 
				idx={idx}
				activeList={this.activeList}
				active={idx === this.state.activeIdx}
				title={item.title} 
				date={item.date} 
				deleteItem={this.deleteCallBack.bind(this)} 
				editItem={this.editCallBack.bind(this)} 
				oldId={item.id} />	
				//<li>{item.title}</li>
				)
			}
		</ul>
		)
	}
}


class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			toDoItems : []
		}
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.addToDo = this.addToDo.bind(this);
	
	}
	componentDidMount(){
			this.fetchComments();
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

	addToDo(title, id){
		const toDoLists = this.state.toDoItems;
		const monthName = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		let today = new Date(),
			dd = today.getDate(),
			mm = today.getMonth(), //January is 0!
		 	yyyy = today.getFullYear();
		today = dd + '/' + monthName[mm];
		if (dd < 10) {
		dd = '0' + dd;
		}

		if (mm < 10) {
		mm = '0' + mm;
		}
		toDoLists.push({
			title: title,
			id: 1 + Math.random(),
			date: today
		});

		this.setState({toDoLists})
	}

	handleDelete(itemId){
		const list = [...this.state.toDoItems]

		const toDoList = list.filter(
			todo => todo.id !==itemId
		);

		this.setState({toDoItems: toDoList});
	}
	handleEdit(title, oldId){
		let list = [...this.state.toDoItems];
		const toDo = {
			title: title,
			id: 1 + Math.random(),
		
		}
		let listItem = list.map(item => {
		//	console.log(title);
			if(item.id === oldId ){
				item.title = title;
				item.id = 1 + Math.random();
			//	console.log(item.title);
			}
			return item;
		});
		/**toDoItem: this.state.toDoItem.map((row, i) => { 
			i === this.props.rowIdx ? "test" : row
		})**/
	//	console.log(this.state.toDoItems.title);
		this.setState({toDoItems: list});
		//console.log(listItem);
	}
	render(){
		console.log(this.state.toDoItems);
		return(
			<div className="main">
				<header className="mainHeader">
					<div className="header">
						<h1> ToDo App </h1>
						<AddListForm addNew={this.addToDo}  />
					</div>
				</header>
				<div className="container">
					<TodoList  todoList={this.state.toDoItems} editItem={this.handleEdit} deleteItem={this.handleDelete}/>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App  />, document.getElementById("main"), console.timeEnd("app"));	


