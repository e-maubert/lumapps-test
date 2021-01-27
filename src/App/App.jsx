/* eslint-disable react/no-unescaped-entities */
import React from 'react'

import './App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import Header from '../components/Header';
import PersonList from '../components/PersonList';
import Person from '../components/Person';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search:''
		}
	}
	
	callbackSearch = (search) => {
		this.setState({search: search})
	}

	render() {
		console.log('this.state.search')
		console.log(this.state.search)
		return (
			<Router>
				<Header sendSearch={this.callbackSearch.bind(this)} />
				<Switch>
					<Route exact path="/">
						<PersonList searchFromParent={this.state.search} />
					</Route>
					<Route exact path="/person/:personId" component={Person} />
				</Switch>
			</Router>
		);
	};
}