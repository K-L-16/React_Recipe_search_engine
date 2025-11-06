import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/home'
import Favorites from './pages/favorites'
import Details from './pages/details'

function App() {

  return (
    <div className="fade-in">
      <div className='min-h-screen p-6 bg-white text-grey-600 text-lg'>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/recipe-item/:id' element={<Details />} />
        </Routes>
      </div>

    </div>
  )
}

export default App
