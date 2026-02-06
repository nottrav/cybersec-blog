import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

const THEME_KEY = "theme"

type ThemeMode = "dark" | "light"

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  root.classList.toggle("dark", mode === "dark")
  localStorage.setItem(THEME_KEY, mode)

  const themeColorMeta = document.querySelector('meta[name="theme-color"]')
  if (themeColorMeta) {
    themeColorMeta.setAttribute(
      "content",
      mode === "dark" ? "#201b25" : "#f2ebfa"
    )
  }
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY)
    const prefersDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches

    const initialTheme: ThemeMode =
      stored === "dark" || stored === "light"
        ? stored
        : prefersDark
          ? "dark"
          : "light"

    applyTheme(initialTheme)
    setIsDark(initialTheme === "dark")
  }, [])

  return (
    <Toggle
      aria-label="Toggle dark mode"
      className="ml-4"
      size="sm"
      pressed={isDark}
      onPressedChange={(pressed) => {
        const next: ThemeMode = pressed ? "dark" : "light"
        applyTheme(next)
        setIsDark(pressed)
      }}
    >
      {isDark ? (
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </Toggle>
  )
}
