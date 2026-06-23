import { MenuItem } from '@ds/MenuItem/MenuItem'

export interface SidebarNavItem {
  id: string
  label: string
  icon: React.ReactNode
  active?: boolean
  onClick?: () => void
}

export interface SidebarProps {
  expanded: boolean
  onToggle: () => void
  items: SidebarNavItem[]
}

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function Sidebar({ expanded, onToggle, items }: SidebarProps) {
  return (
    <div
      className="flex flex-col gap-[10px] pt-[34px] h-full overflow-hidden"
      style={{
        backgroundColor: 'var(--cds-color-background-layer-01)',
        borderRight: '1px solid var(--cds-color-border-subtle)',
        width: '100%',
      }}
    >
      {/* Hambúrguer */}
      <div className="flex items-center w-full px-2">
        <button
          onClick={onToggle}
          aria-label={expanded ? 'Recolher menu' : 'Expandir menu'}
          aria-expanded={expanded}
          className="flex items-center justify-center h-[64px] w-[64px] shrink-0 border-none cursor-pointer bg-transparent"
          style={{ borderRadius: 'var(--cds-border-radius-sm)' }}
        >
          <span style={{ color: 'var(--cds-color-icon-secondary)', display: 'flex' }}>
            <HamburgerIcon />
          </span>
        </button>
      </div>

      {/* Items de navegação */}
      {items.map(item => (
        <MenuItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          active={item.active}
          expanded={expanded}
          onClick={item.onClick}
        />
      ))}
    </div>
  )
}
