import { HELP_TEXT, ORDERED_SECTIONS } from '../../features/terminal/terminalContent'

export function HelpPanel() {
  return (
    <div className="space-y-2 text-base text-[var(--text-main)]">
      {HELP_TEXT.map((line) => (
        <p key={line}>{line}</p>
      ))}
      <div className="pt-1">
        <p className="text-[var(--accent)]">Commands:</p>
        <ul className="space-y-1">
          {ORDERED_SECTIONS.map((section, index) => (
            <li key={section}>
              {index + 1}. {section}
            </li>
          ))}
          <li>7. resume</li>
          <li>8. theme</li>
          <li>9. clear</li>
        </ul>
      </div>
    </div>
  )
}
