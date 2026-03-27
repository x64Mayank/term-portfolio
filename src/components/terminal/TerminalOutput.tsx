import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { OutputRow } from '../../features/terminal/types'
import { HelpPanel } from './HelpPanel.tsx'

type TerminalOutputProps = {
  rows: OutputRow[]
}

export function TerminalOutput({ rows }: TerminalOutputProps) {
  const reduceMotion = useReducedMotion()
  // Find animated rows indices to reveal them sequentially.
  const animatedIndices = rows
    .map((r, i) => ({ r, i }))
    .filter(({ r }) => r.type === 'animated')
    .map(({ i }) => i)

  const AnimatedText = ({ value, start, onFinish }: { value: string; start: boolean; onFinish: () => void }) => {
    const [visibleCount, setVisibleCount] = useState<number>(start ? 0 : 0)

    useEffect(() => {
      if (!start) return
      const pauseAfter = 600 // ms pause after finishing a line
      let finishTimeout: number | undefined = undefined

      if (reduceMotion) {
        // show immediately, then pause slightly before finishing
        setVisibleCount(value.length)
        finishTimeout = window.setTimeout(() => onFinish(), pauseAfter)
        return () => {
          if (typeof finishTimeout !== 'undefined') clearTimeout(finishTimeout)
        }
      }

      let idx = 0
      setVisibleCount(0)
      // slow reveal: base duration doubled to make reveal half-speed
      const interval = Math.max(10, Math.floor(1600 / Math.max(20, value.length)))
      const id = setInterval(() => {
        idx += 1
        setVisibleCount(idx)
        if (idx >= value.length) {
          clearInterval(id)
          finishTimeout = window.setTimeout(() => onFinish(), pauseAfter)
        }
      }, interval)

      return () => {
        clearInterval(id)
        if (typeof finishTimeout !== 'undefined') clearTimeout(finishTimeout)
      }
    }, [start, value, onFinish])

    return (
      <motion.p key={`animated-${value}-${start ? 1 : 0}`} className="text-[var(--accent)] font-bold">
        {value.slice(0, visibleCount)}
      </motion.p>
    )
  }

  const [currentAnimated, setCurrentAnimated] = useState(0)

  useEffect(() => {
    // reset sequence when rows change
    setCurrentAnimated(0)
  }, [rows])

  useEffect(() => {
    // if no animated rows, nothing to do
    if (animatedIndices.length === 0) return
    // when all animated rows finished, dispatch completion event
    if (currentAnimated >= animatedIndices.length) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('terminal:animationComplete'))
      }
    }
  }, [currentAnimated, animatedIndices.length])

  return (
    <div className="space-y-1">
      {rows.map((row, index) => {
        const transition = reduceMotion ? { duration: 0 } : { duration: 0.16, delay: index * 0.015 }

        if (row.type === 'help') {
          return (
            <motion.div
              key={`help-${index}`}
              initial={reduceMotion ? undefined : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
            >
              <HelpPanel />
            </motion.div>
          )
        }

        if (row.type === 'link') {
          return (
            <motion.a
              key={`${row.href}-${index}`}
              className="block text-[var(--link)] underline underline-offset-2 hover:text-[var(--accent)]"
              href={row.href}
              target="_blank"
              rel="noreferrer"
              initial={reduceMotion ? undefined : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
            >
              {row.label}
            </motion.a>
          )
        }

        if (row.type === 'animated') {
          const animatedIndex = animatedIndices.indexOf(index)
          const start = animatedIndex === currentAnimated

          return (
            <div key={`animated-${index}`}>
              <AnimatedText
                value={row.value}
                start={start}
                onFinish={() => setCurrentAnimated((s) => s + 1)}
              />
            </div>
          )
        }

        return (
          <motion.p
            key={`${(row as any).value ?? index}-${index}`}
            className="text-[var(--text-main)]"
            initial={reduceMotion ? undefined : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
          >
            {(row as any).value}
          </motion.p>
        )
      })}
    </div>
  )
}
