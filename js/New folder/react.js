class Comments extends React.Component{
	render(){
		return(
			<div>
		<p className="name"> {this.props.author} </p>
		<p className="body"> {this.props.body} </p>
		</div>
		);
	}
}			

class TestBox extends React.Component{
	render(){
		return(
		<Comments author="Wyane" body="hello world"/>
		);
	}
}

ReactDOM.render(<TestBox />, document.getElementById("main"));