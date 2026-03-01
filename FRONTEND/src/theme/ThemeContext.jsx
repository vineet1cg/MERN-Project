import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const themes = [
    { id: 'mono', name: 'Mono Brutal', class: '' },
    { id: 'lime', name: 'Original Lime', class: 'theme-lime' },
    { id: 'electric', name: 'Electric Punch', class: 'theme-electric' },
    { id: 'retro', name: 'Retro Pop', class: 'theme-retro' },
    { id: 'acid', name: 'Acid Tech', class: 'theme-acid' },
    { id: 'sunset', name: 'Sunset Clash', class: 'theme-sunset' },
    { id: 'soft', name: 'Soft Whisper', class: 'theme-soft' },
]

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('app-theme') || 'soft'
    })

    useEffect(() => {
        localStorage.setItem('app-theme', currentTheme)

        // Remove all theme classes
        themes.forEach(t => {
            if (t.class) document.body.classList.remove(t.class)
        })

        // Add current theme class
        const themeObj = themes.find(t => t.id === currentTheme)
        if (themeObj && themeObj.class) {
            document.body.classList.add(themeObj.class)
        }
    }, [currentTheme])

    return (
        <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
