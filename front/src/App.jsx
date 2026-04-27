import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './pages/Home'
import MangaDetail from './pages/Details/MangaDetail'
import AnimeDetail from './pages/Details/AnimeDetail'
import GameDetail from './pages/Details/GameDetail'
import Catalogue from './pages/Catalogue'
import AddManga from './pages/Add/AddManga'
import AddAnime from './pages/Add/AddAnime'
import AddGame from './pages/Add/AddGame'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/manga/:id' element={<MangaDetail />} />
        <Route path='/anime/:id' element={<AnimeDetail />} />
        <Route path='/game/:id' element={<GameDetail />} />
        <Route path='/catalogue' element={<Catalogue />} />
        <Route path='/manga/add' element={<AddManga />} />
        <Route path='/add/anime' element={<AddAnime />} />
        <Route path='/add/game' element={<AddGame />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
