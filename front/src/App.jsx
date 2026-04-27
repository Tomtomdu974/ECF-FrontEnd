import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './pages/Home'
import MangaDetail from './pages/MangaDetail'
import AnimeDetail from './pages/AnimeDetail'
import GameDetail from './pages/GameDetail'
import Catalogue from './pages/Catalogue'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/manga/:id' element={<MangaDetail />} />
        <Route path='/anime/:id' element={<AnimeDetail />} />
        <Route path='/game/:id' element={<GameDetail />} />
        <Route path='/catalogue' element={<Catalogue />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
