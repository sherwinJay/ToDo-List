import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import {
	BrowserRouter as Router,
	Link,
	Switch,
	Redirect,
	Route // for later
  } from 'react-router-dom';	

/***************** 
 split MovieApp component as header
 make App as root component
 --TRY TARGET VALUE INSTEAD OF ANCHOR--
******************/


/**class Result extends React.Component{
	constructor(props){
		super(props);
		this.state={
			test: false,
			movieInfo: []
		}
		this.selectMovie = this.selectMovie.bind(this);
	}
	render(){
		if(this.state.test === true){
			<Redirect to={`/movie/${this.props.key}`} />
		}
		return(
			<span>
			<a className="suggestedList">
				{this.props.title}
			</a>
			
			</span>
			);
			
	}
	selectMovie(e){
			let title = this.props.passMovieList.title;
			let body = this.props.passMovieList.overview;
			let id = this.props.passMovieList.id;
			let background = this.props.passMovieList.backdrop_path;
			let poster = this.props.passMovieList.poster_path;
			this.props.selectID(id);
			e.preventDefault();
	}
	redirect(){
		this.setState({
			test: true
		});
	}
}**/
class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.state={
			movies: '',
			showSuggestion: false
		}
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.setIgnoreBlur = this.setIgnoreBlur.bind(this);
    	this.clearIgnoreBlur = this.clearIgnoreBlur.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleFilterChange(e){
    	this.props.onFilterChange(e.target.value);
    }

    setIgnoreBlur() {
    	this.ignoreBlur = true;
 	}
  
	clearIgnoreBlur() {
	    this.ignoreBlur = false;
	}
    onFocus(){
    	this.setState({
    		showSuggestion: true
    	});	
    } 
    onBlur(){
    	if (this.ignoreBlur) return;
    	this.setState({
    		showSuggestion: false
    	});	
    }
    handleSubmit(e){
    	alert("submit");
    	e.preventDefault();

    }
	render(){
		console.log(this.state.movies)
		const movieLists = this.props.movieList;
		//console.log(movieLists.length);
		//console.log(movieLists);
		const rows = [];
		let displaySuggestion;
		/**if(rows.length < 2){
			displaySuggestion = {
				display: 'none'
			}
		}**/
		movieLists.slice(0,7).forEach((movie) => {
			rows.push(
				<li lassName="suggestedList">
				<Link to={`/movie/${movie.id}`}>{movie.title} </Link>
				</li>
			);
		});
		return(
			<div className="searchSeaction">
				<form className="searchBox" 
				id="form"
				onBlur={this.onBlur}
				onMouseDown={this.setIgnoreBlur} 
				onMouseUp={this.clearIgnoreBlur} 
				onMouseOut={this.clearIgnoreBlur} >
					<input className="searchBar"
					type="text"
					placeholder="Search Movie.." 
					//value={this.props.searchMovie} 
					onChange={this.handleFilterChange} 
					onFocus={this.onFocus}/>
					<span 
					className="suggestBox" 
					style={displaySuggestion}>
						<ul>{this.state.showSuggestion && rows}</ul>
					</span>
				</form>
			</div>
			);
	}

}

//MovieCategory Child
class Movies extends React.Component{
	render(){
		let bodyText = this.props.overview.substr(0, 120);
		bodyText = bodyText.substr(0, bodyText.lastIndexOf(" ")).concat("...");
		
		return(
				<div className="movieBoxInfo">
					<div className="infoWrapper">
						<p className="boxTitle">{this.props.title}</p>
						<p className="boxRating">Rating: {this.props.rating}</p>
						<p className="boxOverview">{bodyText}</p>
					</div>
				</div>
			);
	}
}

class MovieCategory extends React.Component{
constructor(props){
		super(props);
		this.state={
			movieList: []
		}
	}
  componentWillMount(){
		this.ajaxCall();
	}
	render(){
		console.log(this.props.movieList);
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
			<li className="movieCategoryList">
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
  		const categoryLink = this.props.url; 
  		const apiKey = "ff9d34ddaaebff2b1a6100d54346c1a7";
		let movieLink = "https://api.themoviedb.org/3/movie/" 
						+ categoryLink + "?api_key=" + apiKey + "&language=en-US&page=1";
		
		fetch(movieLink).
		then((Response) => Response.json()).
		then((findmovie) => {
			this.setState({movieList: findmovie.results});
		});
	}
  
}
class HomePage extends React.Component{
	render(){
		return(
			<div className="centerWrapper">
				<h2>Upcoming</h2>
				<MovieCategory url="upcoming"  />
				<h2>Popular</h2>
				<MovieCategory url="popular"  />		
				<h2>Top Rated</h2>
				<MovieCategory url="top_rated"  />
			</div>
		);
	}
}
/*******************************************
*******************TESTING******************
*******************************************/
class ShowInfo extends React.Component{
	render(){
		let formatRevenue = this.props.revenue.toLocaleString();
		return(
			<div className='movieInfoWrapper cfix'>
			<img className="moviePoster" src={`http://image.tmdb.org/t/p/w342/${this.props.poster}` } />
			<div>
				<h2>{this.props.title}</h2>
				<p>{this.props.body}</p>
				<div className="moreInfo cfix">
					<div className="columnLeft">
						<p>Rating: {this.props.rating}</p>
						<p>${formatRevenue}</p>
					</div>
					<div className="columnLeft">
						<p>Runtime: {this.props.runtime}mins</p>
						<p>Release Date: {this.props.releaseDate}</p>
					</div>
				</div>
			</div>
			</div>
		);
	}
}
class Test extends React.Component{
	render(){
		return(
			<h2>HELLO</h2>
		);
	}
}
class MovieInfo extends React.Component{
	constructor(props){
		super(props);
		this.state={
			movieList: []
		}
		//this.fetchURL = this.fetchURL.bind(this);
	
	}
	
	componentDidMount(){
		const { match: { params } } = this.props;
		console.log(params.movieId)
		this.fetchURL(params.movieId);
	}
	componentDidUpdate(prevProps){
		const { match: { params } } = this.props;
		if(prevProps.match.params.movieId !== this.props.match.params.movieId ){
		console.log(params.movieId)
		this.fetchURL(params.movieId);
		}
	}
	render(){
		const movieItems = this.state.movieList.map((movie) => {
				const backgroundImage = {
				backgroundImage: `url(http://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
				backgroundSize: 'cover',
				opacity: "0.5" 
			};
				return(
			//put comment here			
			<div className="comment-list" style={backgroundImage}>
				<ShowInfo
					title={movie.title}
            		body={movie.overview}
            		poster={movie.poster_path}
            		rating={movie.vote_average}
            		runtime={movie.runtime}
            		revenue={movie.revenue}
            		releaseDate={movie.release_date}
            		/>
			</div>
			);
			
		});
		return(
			<div>
				{movieItems}
			</div>
		);
		
	}
	fetchURL(url){
		const apiKey = "ff9d34ddaaebff2b1a6100d54346c1a7";
		const newMovieLink = `https://api.themoviedb.org/3/movie/
							${url}?api_key=${apiKey}
							&append_to_response=credits,videos`;
		console.log(newMovieLink);
		$.ajax({
			method: 'GET',
			url: newMovieLink,
			success: (movieList) => {
				//create new movie link here
				this.setState({movieList: [movieList]});
			}
		});
		
	}

}
/*******************************************
********************************************
*******************************************/
class AppHeader extends React.Component{
	render(){
		return(
			<header className="mainHeader">
				<div className="centerWrapper cfix">
			        <Link to="/" ><h1 className="logo">MovieInfo</h1></Link>
					<SearchBar 
						onFilterChange={this.myCallback.bind(this)} 
						searchMovie={this.props.searchMovie}
						movieList={this.props.movieList} />
		        </div>
		    </header>
		);
	}
	myCallback(dataFromChild){
    	this.props.onFilterChange(dataFromChild);
	}
}

class MovieApp extends React.Component{
	constructor(props){
		super(props);
		this.state={
			query: '',
			movieId:'',
			movieList: [],
			movieInformation: []
		}
		this.handleFilter = this.handleFilter.bind(this);
	}
	componentDidMount(){
		this.fetchMovie();
	}
	render(){
		//console.log(this.state.query);
		let movieLists = this.state.movieList;
		console.log(movieLists);
		console.log(this.state.movieInformation);
		console.log(this.state.movieId);
		return(	
			<Router>
			<div>
				<AppHeader 
					onFilterChange={this.handleFilter} 
				    searchMovie={this.state.query}
				    movieList={this.state.movieList}
				   
				/>	
				<Switch>	
				<Route exact path="/" component={HomePage} />
				<Route path="/movie/:movieId" component={MovieInfo} />	
				</Switch>
          	</div>
			</Router>
			 
			);
	}

	

	fetchMovie(){
		const apiKey = "ff9d34ddaaebff2b1a6100d54346c1a7";
						
		let movieLink = "https://api.themoviedb.org/3/search/movie?api_key=" + 
						apiKey + "&language=en-US&query=" + 
						this.state.query + "&page=1&include_adult=false";
		console.log(movieLink);
		$.ajax({
			method: 'GET',
			url: movieLink,
			success: (movieList) => {
				//create new movie link here
				this.setState({movieList: movieList.results});
			}
		});
	}

	handleFilter(query){
		this.setState({
			query: query
		}, () => {
		    if (this.state.query && this.state.query.length > 0) {
		        return  this.fetchMovie();
		    }else if(!this.state.query){
		      	
		    }
    	});
	
	}
}
//Handle React Routes
/**
<!DOCTYPE html>
<html>
<head>
	<title>React Practice</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
</head>
<body>
		<div class="game-logo">
        <a class="game-provider activeProvider" id="playtech" href="index.html" onclick="activeGameProvider('playtech')">Playtech</a>
        <a class="game-provider" id="microgaming" href="about.html" onclick="activeGameProvider('microgaming')">Microgaming</a>
       
      </div>
	<div class="col-md-3 game-slot-container all-games slots game-top slots" data-category="slots">
		<div class="game-slot-overlay-container">
		   <p>横财神</p>
		   <div class="game_favorite">
			  FAVORITE<button class="fav-button" onclick="favorite(this)" data-name="灌篮大师" data-image="http://gamegateway.t1t.games/includes/images/dt/sd.png" alt="灌篮大师" data-url="/iframe_module/goto_t1games/1023/sd/real"></button>
		   </div>
		   <div class="game-slot-buttons">
			  <a href="http://player.staging.onestop.t1t.in/player_center/goto_goldenf_pgsoft/857/fortune-gods/real" target="_blank" class="playnow">开始游戏</a>
			  <a href="http://player.staging.onestop.t1t.in/player_center/goto_goldenf_pgsoft/857/fortune-gods/fun" target="_blank" class="trial">免费试玩</a>
		   </div>
		</div>
		<a>
		<img class="game-img" src="http://gamegateway.t1t.games/includes/images/cn/microgaming/RubyThousandIslands.jpg" onerror="this.onerror=null;this.src='https://www.gamegateway.t1t.games/cdn/error.jpg';">
		</a>
	 </div>
	 <div class="button-container">
			   <button class="cn-btn active-btn" onclick="cnBtn()">
				   CN
				   </button>
				   <button class="en-btn" onclick="enBtn()">
				   EN
			   </button>
		   </div>
		   
		<script>
		   
	  //Global Variables 
		 
		let gameContainer = document.querySelectorAll("img.game-img");
		let gameProvider =  document.querySelectorAll("a.game-provider");
		 
		//CHANGE IMAGE PATH	 
	  function changeImgSrc( path ){

		//get "/images/" path for dynamic reference of img src 
		let imgPath = "/images/",
				imgPathIdxPos = gameContainer[0].currentSrc.indexOf(imgPath),
				addIdxPos = imgPathIdxPos + imgPath.length;
	
			return [...gameContainer].forEach( idx => {			
				if(idx.src.match(/\/cn/i) ){
					
					//delete "cn/" 
					idx.src = idx.src.slice(0, addIdxPos) + path + idx.src.slice(addIdxPos + 3);
				}else if( idx.src === "https://www.gamegateway.t1t.games/cdn/error.jpg" ){
					idx.src = idx.src;
				}else{
					idx.src = idx.src.slice(0, (addIdxPos - 1)) + path + idx.src.slice(addIdxPos);
				}       
			});
		 
		}
	 
		//create en / cn button function

		function enBtn(){
		  if($(".en-btn").hasClass("active-btn")){
			return;
		  }else{
				$(".active-btn").removeClass("active-btn");
				$(".en-btn").addClass("active-btn");
				return changeImgSrc( "" );
		   }
		 }
		 function cnBtn(){
		  if($(".cn-btn").hasClass("active-btn")){
			  return;
		  }else{
				$(".active-btn").removeClass("active-btn");
				$(".cn-btn").addClass("active-btn");
				return changeImgSrc("/cn/");
		   }
		 }
	 
		 // FOR ACTIVE GAME PROVIDER
		function activeGameProvider(gameProviders){
			let el = document.getElementById(gameProviders);
			
			//iterate game-provider to add and remove the activeProvider class.

			[...gameProvider].forEach(idx => {
				idx.className = idx.className.replace(/\bactiveProvider\b/g, "");
				el.classList.add("activeProvider");
			});
		
		}

		</script>
			 
</body>
</html>

**/

ReactDOM.render(<MovieApp  />, document.getElementById("main"), console.timeEnd("app"));
