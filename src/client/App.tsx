import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Details from './views/Details';
import Admin from './views/Admin';
import Compose from './views/Compose';

const Template: React.FC<ITemplateProps> = props => {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/details/:chirpid">
					<Details />
				</Route>
				<Route exact path="/admin/:chirpid">
					<Admin />
				</Route>
				<Route exact path="/compose">
					<Compose />
				</Route>
			</Switch>
		</BrowserRouter>

	);
}

interface ITemplateProps { }

export default Template;


