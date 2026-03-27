export type ThemeMode = string

export type OutputRow =
  | { type: 'text'; value: string }
  | { type: 'link'; label: string; href: string }
  | { type: 'help' }
  | { type: 'animated'; value: string }

export type TerminalEntry = {
  id: number
  command: string
  rows: OutputRow[]
}

export type TerminalState = {
  entries: TerminalEntry[]
  history: string[]
  historyIndex: number | null
  input: string
  nextEntryId: number
}

export type CommandEffect =
  | { type: 'none' }
  | { type: 'clear' }
  | { type: 'toggle-theme' }
  | { type: 'set-theme'; theme: string }
  | { type: 'open-url'; href: string }

export type CommandExecution = {
  commandLabel: string
  rows: OutputRow[]
  effect: CommandEffect
}
