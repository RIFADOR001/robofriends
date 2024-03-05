import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css'

function App() {
	// constructor () {
	// 	super();
	// 	this.state = {
	// 		robots: [],
	// 		searchfield: ''
	// 	}
	// }

	// You pass the state thing and the function to modify it. The parameter of useState
	// is the initial value of the thing
	const [robots, setRobots] = useState([]);
	const [searchfield, setSearchfield] = useState("");

	// componentDidMount() {
	// 	fetch('https://jsonplaceholder.typicode.com/users')
	// 		.then(response => response.json())
	// 		.then(users => this.setState({robots: users}));
	// 	// this.setState({ robots: robots})
	// }

	// useEffect gets run every time the app is run
	// The first parameter is the effect. The second one,
	// if present, effect will only activate if the values in the list change
	// If the list is empty, then it will run only the first time
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => setRobots(users));
			// console.log('robots and searchfield ', robots, searchfield);
	}, [])

	// Defining onSearchChange this way instead of 
	// onSearchChange(event) => {}
	// allows us to use --this-- inside
	const onSearchChange = (event) => {	
		setSearchfield(event.target.value);
	}


	const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	})
	// Equivalent to robots.length === 0
	
	// console.log('searchfield ', searchfield);
	if (!robots.length) {
		return <h1>Loading</h1>
	}else{
		return (
			<div className='tc'>
				<h1 className='f1'> RoboFriends </h1>
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<ErrorBoundry>
						<CardList robots={filteredRobots}/>
					</ErrorBoundry>
				</Scroll>
			</div>
		);
	}
	
	
}

export default App;