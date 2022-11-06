import { useEffect, useRef, useState, useCallback, useContext } from 'react'
import { ThemeContext } from '@/commons/contexts/ThemeContext'

/**
 * App themes
 */
export const themes = ['Default-light', 'Default-dark'] as const
export type Theme = typeof themes[number]

export type ThemeStore = {
  /**
   * Theme state, must be some theme after first render before that always will be null.
   */
  getTheme: () => Theme
  /**
   * Change theme to opposite value if theme state is "light" will be "dark" and if theme state is "dark" will be "light"
   */
  toggleTheme: () => void
  /**
   * Change theme to specific value.
   */
  changeThemeTo: (theme: Theme) => void
  /**
   * Subscriber to store function.
   */
  subscribe: (callback: () => void) => () => void
}

export const useThemeStore = (): ThemeStore => {
  const theme = useRef<Theme>('Default-light')
  const getTheme = useCallback(() => theme.current, [])
  const subscribers = useRef(new Set<() => void>())

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback)
    return () => subscribers.current.delete(callback)
  }, [])

  const set = useCallback((newTheme: Theme) => {
    theme.current = newTheme
    subscribers.current.forEach((callback) => callback())
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = getTheme().includes('dark')
      ? (getTheme().replace('dark', 'light') as Theme)
      : (getTheme().replace('light', 'dark') as Theme)
    set(newTheme)
    changeThemeInDOM(newTheme)
  }, [])

  const changeThemeTo = useCallback((theme: Theme) => {
    set(theme)
    changeThemeInDOM(theme)
  }, [])

  const changeThemeInDOM = (theme: Theme) => {
    document.body.setAttribute('data-theme', theme.toLocaleLowerCase())
    localStorage.appTheme = theme

    // IOS re painting bug on no layout css changes
    document.body.style.translate = '0px'
    setTimeout(() => {
      document.body.style.removeProperty('translate')
    }, 0)
  }

  const setThemeOnMount = () => {
    if (localStorage.appTheme) {
      changeThemeTo(localStorage.appTheme)
    }
    if (
      !('appTheme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      changeThemeTo('Default-dark')
    }
  }

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender) {
      setThemeOnMount()
      isFirstRender.current = false
    }
  }, [])

  return {
    getTheme,
    toggleTheme,
    changeThemeTo,
    subscribe
  }
}

const useTheme = (): { theme: Theme } & Omit<
  ThemeStore,
  'getTheme' | 'subscribe'
> => {
  const themeStore = useContext(ThemeContext)
  if (!themeStore) {
    throw new Error('useTheme says: Theme context not found!')
  }

  const [theme, setTheme] = useState(themeStore.getTheme())
  useEffect(() => {
    return themeStore.subscribe(() => setTheme(themeStore.getTheme()))
  }, [])

  const { changeThemeTo, toggleTheme } = themeStore
  return {
    theme,
    changeThemeTo,
    toggleTheme
  }
}

export default useTheme
