import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { OutputRow, TerminalState } from './types'

const initialState: TerminalState = {
  entries: [
    {
      id: 1,
      command: 'boot',
      rows: [
        { type: 'text', value: 'x64mayank terminal portfolio online.' },
        { type: 'text', value: 'Run `help` to explore commands.' },
      ],
    },
  ],
  history: [],
  historyIndex: null,
  input: '',
  nextEntryId: 2,
}

const terminalSlice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    setInput(state, action: PayloadAction<string>) {
      state.input = action.payload
    },
    addEntry(
      state,
      action: PayloadAction<{ command: string; rows: OutputRow[] }>,
    ) {
      state.entries.push({
        id: state.nextEntryId,
        command: action.payload.command,
        rows: action.payload.rows,
      })
      state.nextEntryId += 1
    },
    clearEntries(state) {
      state.entries = []
    },
    pushHistory(state, action: PayloadAction<string>) {
      state.history.push(action.payload)
    },
    setHistoryIndex(state, action: PayloadAction<number | null>) {
      state.historyIndex = action.payload
    },
    clearInput(state) {
      state.input = ''
    },
    // theme is handled by a separate theme slice
  },
})

export const {
  setInput,
  addEntry,
  clearEntries,
  pushHistory,
  setHistoryIndex,
  clearInput,
} = terminalSlice.actions

export default terminalSlice.reducer
