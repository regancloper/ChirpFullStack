import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Chirps from './components/Chirps';
import Details from './components/Details';
import Mentions from './components/Mentions';
import './scss/app';



const App: React.SFC<IAppProps> = props => {


	return (

		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<Chirps />
				</Route>
				<Route exact path="/:id/admin">
					<Details />
				</Route>
				<Route exact path="/:id/mentions">
					<Mentions />
				</Route>
			</Switch>
		</BrowserRouter>

	);
}

export default App;

interface IAppProps { }
