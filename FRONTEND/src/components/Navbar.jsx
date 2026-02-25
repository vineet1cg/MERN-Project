import React from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Home } from 'lucide-react'
import ThemeSwitcher from './ThemeSwitcher'

const Navbar = () => {
    return (
        <nav className="border-b-[var(--border-width)] border-black bg-accent p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-3xl font-black uppercase tracking-tighter hover:skew-x-2 transition-transform">
                    Punchline
                </Link>
                <div className="flex gap-4">
                    <ThemeSwitcher />
                    <Link to="/" className="neo-button flex items-center gap-2 bg-white">
                        <Home size={20} />
                        <span className="hidden sm:inline">Home</span>
                    </Link>
                    <Link to="/create" className="neo-button flex items-center gap-2 bg-[var(--main)] text-black">
                        <PlusCircle size={20} />
                        <span className="hidden sm:inline">New Post</span>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
