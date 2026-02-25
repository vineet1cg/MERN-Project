import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
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
                    <main className="container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/create" element={<CreatePost />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </ThemeProvider>
    )
}

export default App
