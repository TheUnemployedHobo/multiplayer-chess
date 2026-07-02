import { useSyncExternalStore } from "react"

const useBreakPoint = () => {
  const breakpoints = [
    { name: "sm", width: 640 },
    { name: "md", width: 768 },
    { name: "lg", width: 1024 },
    { name: "xl", width: 1280 },
  ]

  const get = () => {
    const w = window.innerWidth
    let current = "xs"

    for (const { name, width } of breakpoints) if (w >= width) current = name

    return current
  }

  const sub = (fn: () => void) => {
    window.addEventListener("resize", fn)
    return () => window.removeEventListener("resize", fn)
  }

  const bp = useSyncExternalStore(sub, get)

  const flags = {
    lg: bp === "lg" || bp === "xl",
    md: bp === "md" || bp === "lg" || bp === "xl",
    sm: bp === "sm" || bp === "md" || bp === "lg" || bp === "xl",
    xl: bp === "xl",
    xs: true,
  }

  return flags
}

export default useBreakPoint
