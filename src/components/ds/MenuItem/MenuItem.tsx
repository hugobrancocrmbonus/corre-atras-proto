import type { ReactNode } from 'react'

export interface MenuItemProps {
  icon: ReactNode
  label: string
  active?: boolean
  expanded?: boolean
  onClick?: () => void
}

export function MenuItem({ icon, label, active = false, expanded = false, onClick }: MenuItemProps) {
  return (
    <div className="flex items-center w-full px-2">
      <button
        onClick={onClick}
        title={!expanded ? label : undefined}
        className="flex items-center h-[64px] w-full border-none cursor-pointer overflow-hidden"
        style={{
          borderRadius: 'var(--cds-border-radius-sm)',
          backgroundColor: active ? 'var(--cds-color-background-layer-02)' : 'transparent',
        }}
      >
        {/* Icon — sempre 64×64 */}
        <div
          className="flex items-center justify-center shrink-0"
          style={{ width: 64, height: 64 }}
        >
          <span
            style={{
              color: active ? 'var(--cds-color-brand-text)' : 'var(--cds-color-icon-secondary)',
              display: 'flex',
            }}
          >
            {icon}
          </span>
        </div>

        {/* Label — só visível quando expandida */}
        {expanded && (
          <div className="flex-1 min-w-0 flex items-center">
            <span
              className="text-[14px] font-normal leading-[1.8] tracking-[0.28px] truncate"
              style={{ color: 'var(--cds-color-text-primary)' }}
            >
              {label}
            </span>
          </div>
        )}
      </button>
    </div>
  )
}
