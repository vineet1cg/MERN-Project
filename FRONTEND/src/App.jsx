import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Login from './pages/Login'
import AdminSetup from './pages/AdminSetup'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import { ThemeProvider } from './theme/ThemeContext'

function App() {
    React.useEffect(() => {
        document.title = 'Punchline | Neobrutalist Social'
    }, [])

    return (
        <ThemeProvider>
            <Router>
                <div className="min-h-screen bg-bg">
                    <Navbar />
                    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/admin-setup" element={<AdminSetup />} />
                            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                            <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </ThemeProvider>
    )
}

export default App
