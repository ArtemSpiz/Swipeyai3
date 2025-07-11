import './header.css'
import logo from '../assets/images/logo.png'

function Header() {
	return (
		<div className='header'>
			<div className='headerLogo'>
				<img src={logo} alt='logo' />
			</div>
		</div>
	)
}

export default Header
