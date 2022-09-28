import { useState } from "react"

import { ThemeContext } from './theme.context'

type ThemeProviderProps = {
     children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
     children,
}: ThemeProviderProps) => {
     const [theme, setTheme] = useState<boolean>(true)

     // useEffect(() => {
     //      const unsubscribeFunc = onAuthStateChanged(auth, (firebaseUser) => {
     //           setCurrentUser(firebaseUser)
     //      })
     //      return unsubscribeFunc
     // }, [])

     return (
          <ThemeContext.Provider value={{ theme, setTheme }}>
               {children}
          </ThemeContext.Provider>
     )
}