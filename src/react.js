const AddListForm = (props) => {
	const [toDoItem, setToDoItem] = useState("");
return(
	<form onSubmit={this.handleSubmit}>
		<input type="text" 
			value={this.state.toDoItem} 
			onChange={this.addToDo}/>
		<button>Submit</button>
	</form>
);
	addToDo(e){
		setToDoItem({
			toDoItem: e.target.value
		})
	}
	handleSubmit(e){
		props.addNew(toDoItem);

		setToDoItem({
			toDoItem: ""
		})
		e.preventDefault();
		//alert(this.state.toDoItem);
	}
}
/**
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
				<input type="text" 
					value={this.state.toDoItem} 
					onChange={this.addToDo}/>
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
**/
class TaskNote extends React.Component{
	constructor(props){
		super(props);
		this.state={
			hide: false,
			writeNote: false,
			taskNote: ""
		}
		this.addNote = this.addNote.bind(this);
		this.inputNote = this.inputNote.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getTaskNoteLength = this.getTaskNoteLength.bind(this);
	}
	getTaskNoteLength(taskNoteLength){
		if(taskNoteLength.length === 0){
			return	" Add Notes.";
		}else{
			return taskNoteLength;
		}
	}
	addNote(e){
		//const addNote = this.state.taskNote;

		this.setState({writeNote: true});

	}
	handleSubmit(e){
		this.props.handleTaskNote(this.state.taskNote, this.props.oldId);
		
		this.setState({
				taskNote: "",
				writeNote: false,
		})
		e.preventDefault();
	}
	inputNote(e){
		let {value} = e.target
		this.setState({
			taskNote: value,
		})
	}
	render(){ 
		console.log(this.props.taskNote.length);
		return(
		<div className="taskNoteContainer">
			
			<div className="noteHeader">
				<a href="#" onClick={this.addNote} title="Write Note" className="fas fa-pen"></a>
				<a href="#"  onClick={this.props.showNoteBtn } className="fas fa-times" title="Close Tab"></a>
			</div>
			<div className="taskNote">
				{this.state.writeNote ? 
					(
							<form onSubmit={this.handleSubmit}>
								<textarea type="message" 
									value={this.state.toDoItem} 
									onChange={this.inputNote}
									placeholder={this.props.taskNote}>{this.props.taskNote}</textarea>
									<input type="submit" />
									
							</form>
					)
					:
					(
						<div onClick={this.addNote}>
							{this.getTaskNoteLength(this.props.taskNote)}
						</div>
						
					)
				}
			</div>
		</div>
		);
	}
} 

class Taskmenu extends React.Component{
	constructor(props){
		super(props);
		this.state={
			showTaskNote: false
		}
	}
	render(){

		return(
			<div>
			<a href="#" onClick={this.props.editBtn}>
				<i className="far fa-edit"></i>
				<span className="icon">Edit</span>
			</a>
			<a href="#" onClick={this.props.showNoteBtn} >
				<i className="far fa-sticky-note"></i>
				<span className="icon">Add Note</span>
			</a>
			
			<a href="#" onClick={this.props.deleteBtn}>
				<i className="far fa-trash-alt"></i>
				<span className="icon">Delete</span>
			</a>
			</div>
		);
	}
}

class TodoListItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			editTask: false,
			toDoItem : "",
			showTaskMenu: false,
			showTaskNote: false
		}
		//this.handleEdit = this.handleEdit.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.editList = this.editList.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.taskMenu = this.taskMenu.bind(this);
		this.showTaskNote = this.showTaskNote.bind(this);
	}

	onDelete(e){
		e.preventDefault();
		console.log(this.props.oldId);
		this.props.deleteItem(this.props.oldId);
		this.setState({
			showTaskMenu: false
		});
		
		}
		editList(e){
			let {value} = e.target
			this.setState({
				toDoItem: value,
			})
		}
		onEdit(e){
			e.preventDefault();
			this.setState({editTask: !this.state.editTask,
							showTaskMenu: false
			});
		}
		handleSubmit(e){
				
			this.props.editItem(this.state.toDoItem, this.props.oldId);
			this.setState({
				toDoItem: "",
				editTask: false,
				showTaskMenu: false
			});
					
			e.preventDefault();
		}
		taskMenu(e){
			e.preventDefault();
			this.props.activeList(this.props.idx);
			this.setState({
				showTaskMenu: !this.state.showTaskMenu
			});
		}
		taskCallBack(item, i){
			this.props.handleTask(item, i);
		}
		showTaskNote(e){
			e.preventDefault();
			this.setState({
				showTaskNote: !this.state.showTaskNote,
				showTaskMenu: false
			});
		}
	render(){
		/*******************
		FIX THIS LINES LATER | MAKE TASK MENU A CHILD COMPONENT??? 
		********************/
		let showTask;

		const show = {
			display: "flex",
		}
		const hide= {
			display: "none",
		}
		console.log(this.state.toDoItem);
		
		if(this.props.active && this.state.showTaskMenu
		){
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
							<div className="title">
							<form onSubmit={this.handleSubmit}>
								<input type="text" 
									value={this.state.toDoItem} 
									onChange={this.editList}
									placeholder={this.props.title}/>
									
							</form>
							</div> 
							<div className="btn">  
							<a href="#" onClick={this.onEdit}>Cancel</a>
							</div>
						</li>
					)
					:
					(
						<li className="listItem" >
							<div className="title">{this.props.title}</div>
							<div className="btn">
								<form>
									<label><i className="far fa-calendar-alt"></i></label>
								</form> {this.props.date} 
							
								<a href="#" onClick={this.taskMenu} className="showTaskButton">
								</a>
								<div  style={showTask} className="taskMenu">
									<Taskmenu deleteBtn={this.onDelete} 
										editBtn={this.onEdit} 
										showNoteBtn={this.showTaskNote}/>
									
								</div>
							</div>
							<div className="taskNoteBg" style={ 
								this.props.active && this.state.showTaskNote ? show : hide
							 }>
							<TaskNote 
								taskNote={this.props.taskNote} 
								showNoteBtn={this.showTaskNote}
								handleTaskNote={this.taskCallBack.bind(this)}
								oldId={this.props.oldId}
							/>
							</div>
						</li>
						
					)
				}
			</div>
		)
	}

}
class TodoList extends React.Component{
	deleteCallBack(item){
		this.props.deleteItem(item);
	}	
	editCallBack(item, i){
		this.props.editItem(item, i);
	}
	taskCallBack(item, i){
		this.props.handleTaskNote(item, i);
	}

	render(){
		return(
		<ul>
			{
				this.props.todoList.map( (item, idx) => 
				<TodoListItem 
					showTaskMenu={this.props.showTaskMenu}
					idx={idx}
					activeList={this.props.activeList}
					active={idx === this.props.activeIdx}
					title={item.title} 
					date={item.date} 
					taskNote={item.taskNote}
					deleteItem={this.deleteCallBack.bind(this)} 
					editItem={this.editCallBack.bind(this)} 
					oldId={item.id}
					handleTask={this.taskCallBack.bind(this)} />	
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
			toDoItems : [],
			showTaskMenu: false,
			activeIdx: -1,
			showTaskNote: false
		}
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.addToDo = this.addToDo.bind(this);
		this.activeList = this.activeList.bind(this);
		this.handletaskNote = this.handletaskNote.bind(this);
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

		this.setState({toDoItems: toDoList, 
			      showTaskMenu: false
			      });
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
		this.setState({toDoItems: list,
			      showTaskMenu: false
			      });
		//console.log(listItem);
	}
	handletaskNote(task, oldId){
		let list = [...this.state.toDoItems];
		const toDo = {
			taskNote: task,
		
		}
		let listItem = list.map(item => {
		//	console.log(title);
			if(item.id === oldId ){
				item.taskNote = task;
			//	console.log(item.title);
			}
			return item;
		});
		this.setState({toDoItems: list,
			      showTaskMenu: false
			      });
		//console.log(listItem);
	}
	activeList(idx){
		this.setState({activeIdx: idx
			      });
	}
	showTaskNote(id){
		this.setState({showTaskNote: true});
		/******************* 
		 try to replicate the edit function
		 so every added note will be added to
		 correct task item.
		 * ****************/
	}
	render(){
		console.log(this.state.toDoItems);
		return(
			<div className="main">
				<header className="mainHeader">
					<div className="header">
						<h1> ToDo App </h1>
						<AddListForm 
							addNew={this.addToDo}  />
					</div>
				</header>
				<div className="container">
					<TodoList 
						showTaskMenu={this.state.showTaskMenu} 
						activeIdx={this.state.activeIdx} 
						activeList={this.activeList}  
						todoList={this.state.toDoItems} 
						editItem={this.handleEdit} 
						deleteItem={this.handleDelete}
						handleTaskNote={this.handletaskNote}/>
						
					
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App  />, document.getElementById("main"), console.timeEnd("app"));
