/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Header from '../components/Header';
import Search from '../components/Search';
import PersonList from '../components/PersonList';
import Person from '../components/Person';

function App() {
  return (
	<Router>
		<Header />
		<Switch>
			<Route exact path="/">
				<Search />
				<PersonList />
			</Route>
			<Route exact path="/person/:personId" component={Person} />
		</Switch>
	</Router>
  );
}

export default App;
