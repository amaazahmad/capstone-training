
import { createContext } from 'react';

type ThemeType = {
     isDarkTheme: boolean,
     setIsDarkTheme: (isDarkTheme: boolean) => void
}

export const ThemeContext = createContext<ThemeType>({ isDarkTheme: false, setIsDarkTheme: () => { } })