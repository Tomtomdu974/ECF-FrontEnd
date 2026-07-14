import { Routes, Route } from 'react-router'
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
import Login from './pages/Login'
import Register from './pages/Register'
import Profils from './pages/Profils'
import EditProfil from './pages/Edit/EditProfil'

import Header from './layouts/Header'
import Footer from './layouts/Footer'

//import des dashboard admin
import DashboardLayout from './layouts/DashboardLayout'
import DashboardHome from './pages/dashboard/DashboardHome'
import DashboardUsers from './pages/dashboard/DashboardUsers'
import DashboardCategories from './pages/dashboard/DashboardCategories'
import DashboardGenres from './pages/dashboard/DashboardGenres'

// Protection des routes
import Protected from './route/Protected'
import PublicOnlyRoute from './route/PublicOnlyRoute'

function App() {

  return (
    <>
      <Header />
      <Routes>

        {/* Routes accessibles à tous */}
        <Route path='/' element={<Home />} />
        <Route path='/manga/:id' element={<MangaDetail />} />
        <Route path='/anime/:id' element={<AnimeDetail />} />
        <Route path='/game/:id' element={<GameDetail />} />
        <Route path='/catalogue' element={<Catalogue />} />

        {/* Routes accessible uniquement quand on est connecté */}
        <Route element={<Protected />}>
          <Route path='/add/manga' element={<AddManga />} />
          <Route path='/add/anime' element={<AddAnime />} />
          <Route path='/add/game' element={<AddGame />} />
          <Route path='/edit/manga/:id' element={<EditManga />} />
          <Route path='/edit/game/:id' element={<EditGame />} />
          <Route path='/edit/anime/:id' element={<EditAnime />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/profil' element={<Profils />} />
          <Route path='/editprofil' element={<EditProfil />} />
          <Route path='/dashboard' element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path='users' element={<DashboardUsers />} />
            <Route path='categories' element={<DashboardCategories />} />
            <Route path='genres' element={<DashboardGenres />} />
          </Route>
        </Route>


        {/* Routes accessible uniquement quand on est déconnecté */}
        <Route element={<PublicOnlyRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>

      <Footer />
    </>
  )
}

export default App
