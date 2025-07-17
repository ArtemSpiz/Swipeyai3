import CreateAccount from './pages/CreateAcount/CreateAccount'
import Home from './pages/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/feed' element={<Home />} />
					<Route path='/feed/signup' element={<CreateAccount />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
