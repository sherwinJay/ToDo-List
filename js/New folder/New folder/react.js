
/**	class TestBox extends React.Component{
				
				constructor(props) {
					super(props);

					this.state = {
						showComments: false,
						comments: []
					};

				}
				componentWillMount(){
					this._fetchComments();
				}

				render() {

					const comments = this._getComments();
					let commentNodes;
					let buttonText = "Show Comments";

					if( this.state.showComments ){
						buttonText = "Hide Comments";
					
						commentNodes = <div className="comment-list">{comments}</div>
					}

					return(
						<div className="comment-box">
								<h2>Join the Discussion</h2>
							<CommentForm addComment={this._addComment.bind(this)} />
							
							<button onClick={this._handleClick.bind(this)}>{buttonText}</button>
							<h4>{this._getCommentTitle(comments.length)}</h4>
							{commentNodes}

						</div>
					);
				}
				_getComments() {
				    return this.state.comments.map((comment) => {
				      return <Comment
				               id={comment.id}
				               author={comment.author}
				               body={comment.body}
				               key={comment.id} />
				    });
				  }

				_getCommentTitle(commentNum){
					if(commentNum === 0){
						return 'No Comments';
					}else if(commentNum === 1){
						return '1 Comment';
					}else{
					return `${commentNum} Comments`;
					}
				} 

				_handleClick(){

					this.setState({
						showComments: !this.state.showComments
					});

				}
				
				_addComment(author, body){
					const comment = {
						id: this.state.comments.length + 1,
						author: author,
						body: body
					};
					this.setState({ comments: this.state.comments.concat([comment]) });
				}
				_fetchComments(){

					$.ajax({
						method: 'GET',
						url: 'comments.json',
						success: (comments) => {
							this.setState({comments})
						}

					});
				}
			}

					

			
			class CommentForm extends React.Component{
				render(){
					return(
						<form onSubmit={this._handleSubmit.bind(this)}>
							<div className="formFields">
								<input placeholder="Name" ref={(input) => this._author = input} required />
								<textarea placeholder="Comments" ref={(textarea) => this._body = textarea} required></textarea>
							</div>
							<div className="formAction"> 
								<button type="submit">Post Comment</button>
							</div>
						</form>
						
					);


				}

				_handleSubmit(e){
					e.preventDefault();

					let author = this._author;
					let body = this._body;

					this.props.addComment(author.value, body.value);
				}

			}

			class Comments extends React.Component{
				render(){
					return(
					<div className="comment">
					<p className="name"> {this.props.author} </p>
					<p className="body"> {this.props.body} </p>
					</div>
					);
				}
			}	


			ReactDOM.render(<TestBox />, document.getElementById("main"));**/




//COPY
			class TestBox extends React.Component{
				
				constructor() {
					super();

					this.state = {
						showComments: false,
						comments: []
					};

				}
				componentWillMount(){
					this._fetchComments();
				}

				render() {

					const comments = this._getComments();
					let commentNodes;
					let buttonText = "Show Comments";

					if( this.state.showComments ){
						buttonText = "Hide Comments";
					
						commentNodes = <div className="comment-list">{comments}</div>
					}

					return(
						<div className="comment-box">
							<CommentForm addComment={this._addComment.bind(this)} />
							<h2>Join the Discussion</h2>
							<button onClick={this._handleClick.bind(this)}>{buttonText}</button>
							<h4>{this._getCommentTitle(comments.length)}</h4>
							{commentNodes}

						</div>
					);
				}
				_getComments(){
						
					return this.state.comments.map( (comment) => {
						return( 
						<Comments 
						author={comment.author} 
						body={comment.body} 
						key={comment.id} />

						);
					});
				}

				_getCommentTitle(commentNum){
					if(commentNum === 0){
						return 'No Comments';
					}else if(commentNum === 1){
						return '1 Comment';
					}else{
					return `${commentNum} Comments`;
					}
				} 

				_handleClick(){

					this.setState({
						showComments: !this.state.showComments
					});

				}
				_fetchComments(){

					$.ajax({
						method: 'GET',
						url: 'comments.json',
						header: {"Access-Control-Request-Method" : "*"},
						success: (comments) => {
							this.setState({comments})
						}

					});
				}
				
				/**_addComment(author, body){
					const comment = {
						id: this.state.comments.length + 1,
						author,
						body
					};
					this.setState({ comments: this.state.comments.concat([comment])}, function(){ console.log(this.state.comments); }));
				}**/
				_addComment(author, body){
					const comment = {
						author,
						body
					};
					$.ajax({
						method: 'POST',
						url: '/api/comments',
						data: comment,
						header: {"Access-Control-Request-Method" : "*"},
						success: (newComment) => {
							this.setState({ comments: this.state.comments.concat([newComment])},  function(){ console.log(this.state.comments); })
						}

					});
					/**$.post( 'comments.json', {comment} ).success( newComment => {
							this.setState({ comments: this.state.comments.concat([newComment])},  function(){ console.log(this.state.comments); });
						});**/
				}
				
			}


						

			
			class CommentForm extends React.Component{
				render(){
					return(
						<form onSubmit={this._handleSubmit.bind(this)}>
							<div className="formFields">
								<input placeholder="Name" ref={(input) => this._author = input} required />
								<textarea placeholder="Comments" ref={(textarea) => this._body = textarea} required></textarea>
							</div>
							<div className="formAction"> 
								<button type="submit">Post Comment</button>
							</div>
						</form>
						
					);


				}

				_handleSubmit(e){
					e.preventDefault();

					let author = this._author;
					let body = this._body;

					this.props.addComment(author.value, body.value);
				}

			}

			class Comments extends React.Component{
				render(){
					return(
					<div className="comment">
					<p className="name"> {this.props.author} </p>
					<p className="body"> {this.props.body} </p>
					</div>
					);
				}
			}


			ReactDOM.render(<TestBox />, document.getElementById("main"));

/**
class ResultItems extends React.Component{
	render(){
		return( 
				<li>{this.props.title}</li>
			);
	}
}
class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.state={
			showSearch: false
		}
		//this.handleFilterChange = this.handleFilterChange.bind(this);
	}
	render(){
		let movieLists = this.props.onFilterChange.map( (result) => {
			return <ResultItems title={result.title} />
		});
		return(
			<div className="searchSeaction">
				<form className="searchBox">
					<input type="text" value={this.props.searchMovie} onChange={this.handleFilterChange} />
					<span>
						<ul>
							{ movieLists }
						</ul>
					</span>
				</form>
			</div>
			);
	}
	/**handleFilterChange(e){
    	this.props.onFilterChange(e.target.value);
    }**/

}

class Movies extends React.Component{
	render(){
		let bodyText = this.props.overview.substr(0, 120);
		bodyText = bodyText.substr(0, bodyText.lastIndexOf(" ")).concat("...");
		
		return(
				<div className="movieInfo">
					<div className="infoWrapper">
					<p className="boxTitle">{this.props.title}</p>
					<p className="boxRating">Rating: {this.props.rating}</p>
					<p className="boxOverview">{bodyText}</p>
					</div>
				</div>
			);
	}
}

class UpcomingMovies extends React.Component{
constructor(props){
		super(props);
		this.state={
			movieList: []
		}
	}
  componentDidMount(){
		this.ajaxCall();
	}
	render(){
		let resultLink = this.state.movieList.slice(0,5);
		const upcomingMovieList = resultLink.map((movies) => {
			const backgroundImage = {
				backgroundImage: `url(http://image.tmdb.org/t/p/w300/${movies.backdrop_path})`,
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				width: "220px",
				height: "220px"	
			};
			return(
			<li className="movieList">
				<a href="#" className="moviesBox" style={backgroundImage} >
				<Movies 
					title={movies.title}
					overview={movies.overview}
					rating={movies.vote_average} />

				</a>
			</li>
			);
		});
		return(
				<div>
					<ul className="cfix">{upcomingMovieList}</ul>
				</div>
			);
	}
  
  ajaxCall(){
  		const apiKey = "ff9d34ddaaebff2b1a6100d54346c1a7";
		let movieLink = "https://api.themoviedb.org/3/movie/" 
						+ this.props.url + "?api_key=" + apiKey + "&language=en-US&page=1";
		/**$.ajax({
			method: 'GET',
			url: movieLink,
			success: (movieList) => {
				console.log(movieList);
				this.setState({movieList: movieList.results});
			}
		});**/
		console.log(movieLink);
		fetch(movieLink).
		then((Response) => Response.json()).
		then((findmovie) => {
			this.setState({movieList: findmovie.results});
		});
	}
  
}

class MovieApp extends React.Component{
	constructor(props){
		super(props);
		this.state={
			query: '',
			movieList: []
		}
		this.handleFilter = this.handleFilter.bind(this);
	}
	render(){
		return(
				<div>
          <h2 className="title">Movies</h2>
          <SearchBar onFilterChange={this.state.handleFilter} search={this.fetch}/>
	<h2>Upcoming</h2>
          <UpcomingMovies url="upcoming"  />
	<h2>Popular</h2>
	<UpcomingMovies url="popular"  />		
	<h2>Top Rated</h2>
	<UpcomingMovies url="top_rated"  />
          		</div>
          
			);
	}
	fetchData(url){
		const apiKey = "ff9d34ddaaebff2b1a6100d54346c1a7";
		let movieLink = "https://api.themoviedb.org/3/search/movie?api_key=" + 
						apiKey + "&language=en-US&query=" + 
						this.state.query + "&page=1&include_adult=false";
		/**$.ajax({
			method: 'GET',
			url: movieLink,
			success: (movieList) => {
				console.log(movieList);
				//this.setState({movieList: movieList.results});
				this.handleFilter(findmovie);
			}.bind(this);
		});**/
		fetch(movieLink).
		then((Response) => Response.json()).
		then((findmovie) => {
			this.handleFilter(findmovie);
		}).bind(this);
	}
	handleFilter(movieList){
		this.setState({
			movieList: movieList.results
		});

	}

}

ReactDOM.render(<MovieApp  />, document.getElementById("main"));


















/**class SearchRow extends React.Component{
	render(){
		return( 

			);
	}
}**/
class ResultItem extends React.Component{
	render(){
		return(
				<li>{this.props.title}</li>
			);
	}
}

class Result extends React.Component{
	render(){
		let resultItems = this.props.searchResults.map( (result) => {
				return <ResultItem title={result.title} />
			});
		return(
				<ul> {resultItems} </ul>
			);
	}
}
class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.state={
			movies: '',
			showSearch: false
		}
		this.handleFilterChange = this.handleFilterChange.bind(this);
	}
	render(){
		const movieLists = this.props.searchMovie;
		return(
			<div className="searchSeaction">
				<form className="searchBox">
					<input type="text" value={this.state.searchMovie} onChange={this.handleFilterChange} />
					<span> 

					</span>
				</form>
			</div>
			);
	}
	handleFilterChange(e){
    	this.state.onFilterChange(e.target.value);
    }

}

class Movies extends React.Component{
	render(){
		let bodyText = this.props.overview.substr(0, 120);
		bodyText = bodyText.substr(0, bodyText.lastIndexOf(" ")).concat("...");
		
		return(
				<div className="movieInfo">
					<div className="infoWrapper">
					<p className="boxTitle">{this.props.title}</p>
					<p className="boxRating">Rating: {this.props.rating}</p>
					<p className="boxOverview">{bodyText}</p>
					</div>
				</div>
			);
	}
}

class UpcomingMovies extends React.Component{
constructor(props){
		super(props);
		this.state={
			movieList: []
		}
	}
  componentDidMount(){
		this.ajaxCall();
	}
	render(){
		let resultLink = this.state.movieList.slice(0,5);
		const upcomingMovieList = resultLink.map((movies) => {
			const backgroundImage = {
				backgroundImage: `url(http://image.tmdb.org/t/p/w300/${movies.backdrop_path})`,
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				width: "220px",
				height: "220px"	
			};
			return(
			<li className="movieList">
				<a href="#" className="moviesBox" style={backgroundImage} >
				<Movies 
					title={movies.title}
					overview={movies.overview}
					rating={movies.vote_average} />

				</a>
			</li>
			);
		});
		return(
				<div>
					<ul className="cfix">{upcomingMovieList}</ul>
				</div>
			);
	}
  
  ajaxCall(){
  		const apiKey = "ff9d34ddaaebff2b1a6100d54346c1a7";
		let movieLink = "https://api.themoviedb.org/3/movie/" 
						+ this.props.url + "?api_key=" + apiKey + "&language=en-US&page=1";
		/**$.ajax({
			method: 'GET',
			url: movieLink,
			success: (movieList) => {
				console.log(movieList);
				this.setState({movieList: movieList.results});
			}
		});**/
		console.log(movieLink);
		fetch(movieLink).
		then((Response) => Response.json()).
		then((findmovie) => {
			this.setState({movieList: findmovie.results});
		});
	}
  
}

class MovieApp extends React.Component{
	constructor(props){
		super(props);
		this.state={
			movieList: [],
		}
		this.handleFilter = this.handleFilter.bind(this);
	}
	render(){
		return(
				<div>
          <h2 className="title">Movies</h2>
    <SearchBar search={this.fetchData} 
    			//searchMovie={this.state.searchTitle}
    			/>
	<h2>Upcoming</h2>
	<Result searchResults={this.state.handleFilter}/>
    <UpcomingMovies url="upcoming"  />
	<h2>Popular</h2>
	<UpcomingMovies url="popular"  />		
	<h2>Top Rated</h2>
	<UpcomingMovies url="top_rated"  />
          		</div>
          
			);
	}
	fetchData(url){
		const apiKey = "ff9d34ddaaebff2b1a6100d54346c1a7";
		let movieLink = "https://api.themoviedb.org/3/search/movie?api_key=" + 
						apiKey + "&language=en-US&query=" + 
						this.state.query + "&page=1&include_adult=false";
		/**$.ajax({
			method: 'GET',
			url: movieLink,
			success: (movieList) => {
				console.log(movieList);
				//this.setState({movieList: movieList.results});
				this.handleFilter(findmovie);
			}.bind(this);
		});**/
		fetch(movieLink).
		then((Response) => Response.json()).
		then((findmovie) => {
			this.handleFilter(findmovie);
		}).bind(this);
	}
	handleFilter(movieList){
		this.setState({
			movieList: movieList.results
		});

	}

}

ReactDOM.render(<MovieApp  />, document.getElementById("main"));







**/