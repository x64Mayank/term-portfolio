import type { KeyboardEvent, RefObject } from 'react'

type TerminalPromptProps = {
  input: string
  onInputChange: (value: string) => void
  onSubmit: () => void
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  inputRef: RefObject<HTMLInputElement | null>
}

export function TerminalPrompt({
  input,
  onInputChange,
  onSubmit,
  onKeyDown,
  inputRef,
}: TerminalPromptProps) {
  return (
    <form
      className="flex flex-col gap-1 border-t border-white/10 px-4 py-3"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <span className="text-[var(--accent)] text-base font-medium">guest@portfolio.x64mayank ~</span>
      <div className="flex items-center gap-2">
        <span className="text-[var(--accent)] text-base font-medium whitespace-nowrap">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="type help"
          className="flex-1 min-w-0 bg-transparent text-base text-[var(--text-main)] outline-none placeholder:text-[var(--placeholder)]"
          aria-label="Terminal command input"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </form>
  )
}
