import { BrowserRouter, Routes, Route } from 'react-router'
import './styles/App.css'
import './styles/Card.css'
import Home from './pages/Home'
import MangaDetail from './pages/Details/MangaDetail'
import AnimeDetail from './pages/Details/AnimeDetail'
import GameDetail from './pages/Details/GameDetail'
import Catalogue from './pages/Catalogue'
import AddManga from './pages/Add/AddManga'
import AddAnime from './pages/Add/AddAnime'
import AddGame from './pages/Add/AddGame'
import EditManga from './pages/Edit/EditManga'
import EditGame from './pages/Edit/EditGame'
import EditAnime from './pages/Edit/EditAnime'
import Favorites from './pages/Favorites'

import Header from './layouts/Header'
import Footer from './layouts/Footer'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/manga/:id' element={<MangaDetail />} />
        <Route path='/anime/:id' element={<AnimeDetail />} />
        <Route path='/game/:id' element={<GameDetail />} />
        <Route path='/catalogue' element={<Catalogue />} />
        <Route path='/add/manga' element={<AddManga />} />
        <Route path='/add/anime' element={<AddAnime />} />
        <Route path='/add/game' element={<AddGame />} />
        <Route path='/edit/manga/:id' element={<EditManga />} />
        <Route path='/edit/game/:id' element={<EditGame />} />
        <Route path='/edit/anime/:id' element={<EditAnime />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
