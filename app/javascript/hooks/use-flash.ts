import { usePage } from "@inertiajs/react"
import { useEffect } from "react"
import { toast } from "sonner"

export function useFlash() {
  const { flash } = usePage().props as { flash: Record<string, string> }

  useEffect(() => {
    if (flash?.notice) {
      toast.success(flash.notice)
    }
    if (flash?.alert) {
      toast.error(flash.alert)
    }
  }, [flash])
}
