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
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                <Link to="/" className="text-2xl sm:text-3xl font-black uppercase tracking-tighter hover:skew-x-2 transition-transform">
                    Punchline
                </Link>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                    <ThemeSwitcher />

                    {isAuthenticated && (
                        <>
                            <Link to="/" className="neo-button flex items-center gap-2 bg-white px-3 sm:px-5">
                                <Home size={18} className="sm:size-[20px]" />
                                <span className="hidden md:inline">Home</span>
                            </Link>

                            <Link to="/create" className="neo-button flex items-center gap-2 bg-[var(--main)] text-black px-3 sm:px-5">
                                <PlusCircle size={18} className="sm:size-[20px]" />
                                <span className="hidden md:inline">New Post</span>
                            </Link>

                            <button onClick={handleLogout} className="neo-button flex items-center gap-2 bg-[var(--danger)] text-white hover:bg-red-600 transition-colors px-3 sm:px-5">
                                <LogOut size={18} className="sm:size-[20px]" />
                                <span className="hidden md:inline">Logout</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
