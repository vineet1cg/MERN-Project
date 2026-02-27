import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlusCircle, Home, LogOut } from 'lucide-react'
import ThemeSwitcher from './ThemeSwitcher'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <nav className="border-b-[var(--border-width)] border-black bg-accent p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-3xl font-black uppercase tracking-tighter hover:skew-x-2 transition-transform">
                    Punchline
                </Link>
                <div className="flex gap-4">
                    <ThemeSwitcher />

                    {isAuthenticated && (
                        <>
                            <Link to="/" className="neo-button flex items-center gap-2 bg-white">
                                <Home size={20} />
                                <span className="hidden sm:inline">Home</span>
                            </Link>

                            <Link to="/create" className="neo-button flex items-center gap-2 bg-[var(--main)] text-black">
                                <PlusCircle size={20} />
                                <span className="hidden sm:inline">New Post</span>
                            </Link>

                            <button onClick={handleLogout} className="neo-button flex items-center gap-2 bg-[var(--danger)] text-white hover:bg-red-600 transition-colors">
                                <LogOut size={20} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
