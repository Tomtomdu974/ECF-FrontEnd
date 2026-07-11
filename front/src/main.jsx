import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { FavoritesProvider } from './contexts/FavoritesContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <FavoritesProvider>
                <App />
            </FavoritesProvider>
        </AuthProvider>
    </BrowserRouter>
)
