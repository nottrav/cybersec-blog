import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"
import { Toggle } from "@/components/ui/toggle"

const THEME_KEY = "theme"

type ThemeMode = "dark" | "light" | "system"

function getSystemPrefersDark() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
}

function getStoredMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    return stored === "dark" || stored === "light" || stored === "system"
      ? stored
      : "system"
  } catch {
    return "system"
  }
}

function applyTheme(mode: ThemeMode): "dark" | "light" {
  const effective = mode === "system"
    ? getSystemPrefersDark()
      ? "dark"
      : "light"
    : mode
  const root = document.documentElement
  root.classList.toggle("dark", effective === "dark")
  root.dataset.theme = mode

  try {
    localStorage.setItem(THEME_KEY, mode)
  } catch {
    // no-op
  }

  const themeColorMeta = document.querySelector('meta[name="theme-color"]')
  if (themeColorMeta) {
    themeColorMeta.setAttribute(
      "content",
      effective === "dark" ? "#201b25" : "#f2ebfa"
    )
  }
  return effective
}

export default function ThemeToggle({ className }: { className?: string }) {
  const [mode, setMode] = React.useState<ThemeMode>("system")
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const initialMode = getStoredMode()
    const effective = applyTheme(initialMode)
    setMode(initialMode)
    setIsDark(effective === "dark")
  }, [])

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (mode !== "system") return
      const effective = applyTheme("system")
      setIsDark(effective === "dark")
    }

    if (mode === "system") {
      if (media.addEventListener) {
        media.addEventListener("change", handleChange)
      } else if (media.addListener) {
        media.addListener(handleChange)
      }
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", handleChange)
      } else if (media.removeListener) {
        media.removeListener(handleChange)
      }
    }
  }, [mode])

  return (
    <Toggle
      aria-label="Toggle dark mode"
      className={cn(className)}
      size="default"
      pressed={isDark}
      onPressedChange={() => {
        const nextMode: ThemeMode = isDark ? "light" : "dark"
        const effective = applyTheme(nextMode)
        setMode(nextMode)
        setIsDark(effective === "dark")
      }}
      onContextMenu={(event) => {
        event.preventDefault()
        const effective = applyTheme("system")
        setMode("system")
        setIsDark(effective === "dark")
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
