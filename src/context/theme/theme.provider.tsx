import { useState, useEffect } from "react"

import { ThemeContext } from './theme.context'

type ThemeProviderProps = {
     children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
     children,
}: ThemeProviderProps) => {
     const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)

     useEffect(() => {
          const localStorageTheme = localStorage.getItem('theme') === 'dark' ? true : false;
          setIsDarkTheme(localStorageTheme);
     }, [])

     return (
          <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
               {children}
          </ThemeContext.Provider>
     )
}