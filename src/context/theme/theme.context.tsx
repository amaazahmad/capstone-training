
import { createContext } from 'react';

type ThemeType = {
     theme: boolean,
     setTheme: (theme: boolean) => void
}

export const ThemeContext = createContext<ThemeType>({ theme: false, setTheme: () => { } })