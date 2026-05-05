import { createRoot } from 'react-dom/client'
import { FavoritesProvider } from './contexts/FavoritesContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <FavoritesProvider>
        <App />
    </FavoritesProvider>
)
