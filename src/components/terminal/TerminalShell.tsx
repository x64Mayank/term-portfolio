import { useEffect, useRef, type KeyboardEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  addEntry,
  clearEntries,
  clearInput,
  pushHistory,
  setHistoryIndex,
  setInput,
} from '../../features/terminal/terminalSlice'
import { setTheme, toggleTheme } from '../../features/theme/themeSlice'
import {
  selectTerminalEntries,
  selectTerminalHistory,
  selectTerminalHistoryIndex,
  selectTerminalInput,
  
} from '../../features/terminal/terminalSelectors'
import { executeCommand } from '../../features/terminal/terminalCommands'
import { TerminalOutput } from './TerminalOutput'
import { TerminalPrompt } from './TerminalPrompt'
import { useAutoScroll } from '../../shared/hooks/useAutoScroll'

export function TerminalShell() {
  const dispatch = useAppDispatch()
  const entries = useAppSelector(selectTerminalEntries)
  const input = useAppSelector(selectTerminalInput)
  const history = useAppSelector(selectTerminalHistory)
  const historyIndex = useAppSelector(selectTerminalHistoryIndex)

  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useAutoScroll(outputRef, entries)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [entries.length])

  const runCommand = (rawInput: string) => {
    const trimmed = rawInput.trim()
    if (!trimmed) {
      return
    }

    const result = executeCommand(trimmed)

    // Prepare URL opening behavior before adding output to avoid race
    if (result.effect.type === 'open-url') {
      const href = result.effect.href
      const hasAnimated = result.rows.some((r) => (r as any).type === 'animated')

      if (typeof window !== 'undefined') {
        if (!hasAnimated) {
          try {
            window.open(href, '_blank', 'noopener,noreferrer')
          } catch (e) {
            // ignore
          }
        } else {
          let opened = false
          const openFn = () => {
            if (opened) return
            opened = true
            try {
              window.open(href, '_blank', 'noopener,noreferrer')
            } catch (e) {
              // ignore
            }
          }

          const handler = () => {
            openFn()
            window.removeEventListener('terminal:animationComplete', handler)
            if (typeof to !== 'undefined') {
              clearTimeout(to)
            }
          }

          window.addEventListener('terminal:animationComplete', handler)

          // fallback timeout in case animation event is missed
          let to: number | undefined = undefined
          to = window.setTimeout(() => {
            openFn()
            window.removeEventListener('terminal:animationComplete', handler)
          }, 12000)
        }
      }
    }

    if (result.effect.type === 'clear') {
      dispatch(clearEntries())
    } else {
      dispatch(addEntry({ command: result.commandLabel, rows: result.rows }))
    }

    if (result.effect.type === 'toggle-theme') {
      dispatch(toggleTheme())
    }

    if (result.effect.type === 'set-theme') {
      dispatch(setTheme(result.effect.theme))
    }

    

    dispatch(pushHistory(trimmed))
    dispatch(setHistoryIndex(null))
    dispatch(clearInput())
  }

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      return
    }

    if (history.length === 0) {
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const nextIndex =
        historyIndex === null ? history.length - 1 : Math.max(historyIndex - 1, 0)
      dispatch(setHistoryIndex(nextIndex))
      dispatch(setInput(history[nextIndex]))
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex === null) {
        return
      }

      const nextIndex = historyIndex + 1
      if (nextIndex >= history.length) {
        dispatch(setHistoryIndex(null))
        dispatch(setInput(''))
        return
      }

      dispatch(setHistoryIndex(nextIndex))
      dispatch(setInput(history[nextIndex]))
    }
  }

  return (
    <main className={`min-h-screen bg-[var(--bg)] px-3 py-4 text-[var(--text-main)] md:px-8 md:py-8`}>
        <div className="w-full">
          <div className="relative overflow-hidden rounded-none sm:rounded-2xl border border-white/10 bg-[var(--panel)] shadow-2xl shadow-black/40">
            <div className="absolute inset-0 pointer-events-none "></div>

            <div style={{ height: 'calc(100vh - 4rem)' }} className="flex flex-col">
              <section
                ref={outputRef}
                className="relative flex-1 overflow-y-auto px-4 py-4"
              >
                <div className="space-y-5">
                  {entries.map((entry) => (
                    <article key={entry.id} className="space-y-2">
                      <p className="text-base text-[var(--accent)]">$ {entry.command}</p>
                      <TerminalOutput rows={entry.rows} />
                    </article>
                  ))}
                </div>

                <div className="mt-4">
                  <TerminalPrompt
                    input={input}
                    onInputChange={(value) => dispatch(setInput(value))}
                    onSubmit={() => runCommand(input)}
                    onKeyDown={onInputKeyDown}
                    inputRef={inputRef}
                  />
                </div>
              </section>

              {/* QuickCommands removed per user request */}
            </div>
          </div>
        </div>
    </main>
  )
}
