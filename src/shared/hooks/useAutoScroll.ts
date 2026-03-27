import { type RefObject, useEffect } from 'react'

export function useAutoScroll(
  ref: RefObject<HTMLElement | null>,
  dependency: unknown,
): void {
  useEffect(() => {
    const el = ref.current
    if (!el) {
      return
    }

    el.scrollTo({
      top: el.scrollHeight,
      behavior: 'smooth',
    })
  }, [dependency, ref])
}
