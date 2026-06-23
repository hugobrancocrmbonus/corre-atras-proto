const imgBrandPlaceholder = "https://www.figma.com/api/mcp/asset/234fd857-cd52-42bb-a463-dfa596d390af"

export interface SelectorProps {
  brandName?: string
  csResponsavel?: string
  logoSrc?: string
  state?: 'default' | 'pressed'
  onClick?: () => void
}

export function Selector({
  brandName = 'Nome da marca',
  csResponsavel = 'Nome do CS responsável',
  logoSrc,
  state = 'default',
  onClick,
}: SelectorProps) {
  const isPressed = state === 'pressed'

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 40,
        width: '100%',
        padding: 16,
        borderRadius: 4,
        backgroundColor: isPressed ? 'var(--cds-color-background-layer-02, #22272b)' : 'var(--cds-color-background-layer-03, #353e45)',
        border: isPressed ? 'none' : '1px solid var(--cds-color-border-subtle, #353e45)',
        cursor: 'pointer',
        textAlign: 'left',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* data-brand: logo + text */}
      <div style={{ display: 'flex', flex: 1, gap: 16, alignItems: 'center', minWidth: 0 }}>
        {/* Logo container */}
        <div
          style={{
            position: 'relative',
            flexShrink: 0,
            width: 56,
            height: 56,
            borderRadius: 4,
            backgroundColor: 'var(--cds-color-background-layer-01, #121416)',
            overflow: 'hidden',
          }}
        >
          <img
            src={logoSrc ?? imgBrandPlaceholder}
            alt={brandName}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }}
          />
        </div>

        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: 'var(--cds-color-text-primary, #f4f7fa)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {brandName}
          </span>
          <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--cds-color-text-secondary, #bcc6cd)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {csResponsavel}
          </span>
        </div>
      </div>

      {/* Caret right */}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }} aria-hidden>
        <path
          d="M4.5 2.5L8 6L4.5 9.5"
          stroke={isPressed ? 'var(--cds-color-text-primary, #f4f7fa)' : 'var(--cds-color-icon-secondary, #8d9ba5)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
