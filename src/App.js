import CreateAccount from './pages/CreateAcount/CreateAccount'
import Home from './pages/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/signup' element={<CreateAccount />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
