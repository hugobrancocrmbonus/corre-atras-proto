export interface TabItem {
  id: string
  label: string
}

export interface TabsProps {
  items: TabItem[]
  activeId: string
  onChange: (id: string) => void
}

export function Tabs({ items, activeId, onChange }: TabsProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        borderBottom: '1px solid var(--cds-color-border-subtle)',
        width: '100%',
      }}
    >
      {items.map(item => {
        const isActive = item.id === activeId
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 48,
              padding: '12px 16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isActive
                ? 'var(--cds-color-brand-text)'
                : 'var(--cds-color-text-primary)',
              fontSize: 14,
              fontWeight: 500,
              lineHeight: '20px',
              letterSpacing: 0,
              whiteSpace: 'nowrap',
              transition: 'color 0.15s',
            }}
          >
            {item.label}
            {isActive && (
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: 'var(--cds-color-brand-text)',
                  borderRadius: '2px 2px 0 0',
                }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
