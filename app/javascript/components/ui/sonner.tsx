import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "#f9eabf",
          "--normal-text": "oklch(0.4222 0.0756 262.54)",
          "--normal-border": "#f4c33e",
          "--border-radius": "var(--radius)",
          "--success-bg": "#f9eabf",
          "--success-text": "oklch(0.4222 0.0756 262.54)",
          "--success-border": "#f4c33e",
          "--error-bg": "#f9eabf",
          "--error-text": "oklch(0.4222 0.0756 262.54)",
          "--error-border": "#f4c33e",
        } as React.CSSProperties
      }
      position="top-left"
      {...props}
    />
  )
}

export { Toaster }
