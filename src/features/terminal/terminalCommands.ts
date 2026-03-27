import { COMMAND_ALIASES, COMMAND_OUTPUTS, RESUME_URL } from './terminalContent'
import themes, { themeNames } from '../theme/themes'
import type { CommandExecution } from './types'
const RICKROLL_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

export function executeCommand(rawInput: string): CommandExecution {
  const normalized = rawInput.trim().toLowerCase()
  const parts = normalized.split(/\s+/).filter(Boolean)
  const hasExtra = parts.length > 1
  const commandToken = parts[0] ?? ''
  const arg = parts[1] ?? ''
  const command = COMMAND_ALIASES[commandToken] ?? commandToken

  if (!command) {
    return {
      commandLabel: rawInput,
      rows: [{ type: 'text', value: 'Type `help` to get started.' }],
      effect: { type: 'none' },
    }
  }

  if (command === 'help') {
    if (hasExtra) {
      return {
        commandLabel: rawInput,
        rows: [
          { type: 'text', value: 'Invalid usage: `help` does not accept arguments. Run `help` for usage.' },
        ],
        effect: { type: 'none' },
      }
    }

    return {
      commandLabel: rawInput,
      rows: [{ type: 'help' }],
      effect: { type: 'none' },
    }
  }

  if (command === 'resume') {
    if (hasExtra) {
      return {
        commandLabel: rawInput,
        rows: [{ type: 'text', value: 'Invalid usage: `resume` does not accept arguments.' }],
        effect: { type: 'none' },
      }
    }
    return {
      commandLabel: rawInput,
      rows: [{ type: 'text', value: 'Opening resume in a new tab...' }],
      effect: { type: 'open-url', href: RESUME_URL },
    }
  }

  // Hidden prank: rickroll for `su` or `sudo` commands
  if (commandToken === 'su' || commandToken === 'sudo') {
    return {
      commandLabel: rawInput,
      rows: [
        { type: 'animated', value: 'THIS WAS NOT AN OPTION.' },
        { type: 'animated', value: "you still typed it... ehhhh" },
        { type: 'animated', value: 'trying to unlock super powers... EH??' },
        { type: 'text', value: 'Redirecting you now...' },
      ],
      effect: { type: 'open-url', href: RICKROLL_URL },
    }
  }

  if (command === 'clear') {
    if (hasExtra) {
      return {
        commandLabel: rawInput,
        rows: [{ type: 'text', value: 'Invalid usage: `clear` does not accept arguments.' }],
        effect: { type: 'none' },
      }
    }

    return {
      commandLabel: rawInput,
      rows: [],
      effect: { type: 'clear' },
    }
  }

  if (command === 'theme') {
    // Accepts zero or one argument. Zero -> toggle. `list` -> show names. One valid name -> set theme.
    if (parts.length > 2) {
      return {
        commandLabel: rawInput,
        rows: [
          {
            type: 'text',
            value: 'Invalid usage: `theme` accepts at most one argument. Run `theme list` to see available themes.',
          },
        ],
        effect: { type: 'none' },
      }
    }

    if (!arg) {
      return {
        commandLabel: rawInput,
        rows: [
          {
            type: 'text',
            value: 'Theme toggled. You can also run `theme <name>` or `theme list` to see available themes.',
          },
        ],
        effect: { type: 'toggle-theme' },
      }
    }

    if (arg === 'list') {
      return {
        commandLabel: rawInput,
        rows: [{ type: 'text', value: `Available themes: ${themeNames.join(', ')}` }],
        effect: { type: 'none' },
      }
    }

    if (themes[arg]) {
      return {
        commandLabel: rawInput,
        rows: [{ type: 'text', value: `Theme set to ${arg}.` }],
        effect: { type: 'set-theme', theme: arg },
      }
    }

    return {
      commandLabel: rawInput,
      rows: [
        {
          type: 'text',
          value: `Invalid theme: ${arg}. Run \`theme list\` to see available themes.`,
        },
      ],
      effect: { type: 'none' },
    }
  }

  const rows = COMMAND_OUTPUTS[command]
  if (rows) {
    if (hasExtra) {
      return {
        commandLabel: rawInput,
        rows: [{ type: 'text', value: `Invalid usage: \`${command}\` does not accept additional arguments.` }],
        effect: { type: 'none' },
      }
    }

    return {
      commandLabel: rawInput,
      rows,
      effect: { type: 'none' },
    }
  }

  return {
    commandLabel: rawInput,
    rows: [
      {
        type: 'text',
        value: `Unknown command: ${commandToken}. Run \`help\` for usage.`,
      },
    ],
    effect: { type: 'none' },
  }
}
