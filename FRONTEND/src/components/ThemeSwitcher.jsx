import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from '../theme/ThemeContext'
import { Palette, ChevronDown } from 'lucide-react'

const ThemeSwitcher = () => {
    const { currentTheme, setCurrentTheme, themes } = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleThemeSelect = (themeId) => {
        setCurrentTheme(themeId)
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`neo-button flex items-center gap-2 transition-colors ${isOpen ? 'bg-[var(--accent)]' : 'bg-white'}`}
            >
                <Palette size={20} />
                <span className="hidden md:inline font-black uppercase text-xs">Theme</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-[100] animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                    <div className="p-2 bg-black text-white text-[10px] font-black uppercase tracking-widest text-center">
                        Select Aesthetic
                    </div>
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => handleThemeSelect(theme.id)}
                            className={`w-full text-left px-4 py-3 font-black uppercase text-xs border-b-4 border-black last:border-b-0 hover:bg-[var(--accent)] hover:translate-x-1 transition-all text-black ${currentTheme === theme.id ? 'bg-[var(--main)]' : ''
                                }`}
                        >
                            {theme.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ThemeSwitcher
