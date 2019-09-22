import React from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';

import Users from './components/users';
import Exercises from './components/exercises';

import './App.css';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<>
					<header>
						<h1>
							<Link to="/">..:: Exercise Tracker ::..</Link>
						</h1>
					</header>
					<Switch>
						<Route path="/" component={Users} exact />
						<Redirect path="/exercises" to="/" exact />
						<Route
							path="/exercises/:userId"
							component={Exercises}
						/>
					</Switch>
				</>
			</BrowserRouter>
		</div>
	);
}

export default App;
