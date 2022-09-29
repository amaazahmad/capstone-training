import { useState, useEffect } from "react"

import { ThemeContext } from './theme.context'

type ThemeProviderProps = {
     children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
     children,
}: ThemeProviderProps) => {
     const [theme, setTheme] = useState<boolean>(false)

     useEffect(() => {
          const localStorageTheme = localStorage.getItem('theme') === 'dark' ? true : false;
          setTheme(localStorageTheme);
     }, [])

     return (
          <ThemeContext.Provider value={{ theme, setTheme }}>
               {children}
          </ThemeContext.Provider>
     )
}