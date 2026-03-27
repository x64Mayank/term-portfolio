import type { RootState } from '../../app/store'

export const selectTerminalEntries = (state: RootState) => state.terminal.entries
export const selectTerminalHistory = (state: RootState) => state.terminal.history
export const selectTerminalHistoryIndex = (state: RootState) =>
  state.terminal.historyIndex
export const selectTerminalInput = (state: RootState) => state.terminal.input
export const selectTerminalTheme = (state: RootState) => state.theme.current
