import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC<INavbarProps> = props => {
	return (

		<nav className="nav justify-content-center align-items-center p-2 mb-3 shadow">
            <NavLink className="btn btn-link mx-2" activeClassName="text-danger border-bottom" exact to="/">Home</NavLink>
            <NavLink className="btn btn-link mx-2" activeClassName="text-danger border-bottom" exact to="/compose">Compose</NavLink>
        </nav>
	);
}

interface INavbarProps { }

export default Navbar;


