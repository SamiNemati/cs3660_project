import Nav from './Nav'
import Footer from './Footer'
import titles from '..//assets/titles.json'
import {Outlet, useLocation } from 'react-router-dom'

function Layout({user})
{
	function setTitle()
	{
		var route = useLocation().pathname.substring(1);
		var item = titles.find(item => item["link"] == route);
		document.title = item ? `Simple Games - ${item["title"]}`:`Simple Games`;
	}
	setTitle();
	return (
		<>
			<nav><Nav user={user}/></nav>
			<main>
				<Outlet />
			</main>
			<footer><Footer /></footer>
		</>
	);
}
export default Layout; 

